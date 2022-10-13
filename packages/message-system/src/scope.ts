/* eslint-disable */
import { fromEventPattern, merge, Observable, filter, map } from "rxjs";
//import * as rxjsLib from "rxjs";
import { scopeAsyncOn, scopeOff, scopeOn } from "./events";
import { scopeAsyncSend, scopeSend } from "./send";
import {
  AsyncMessageListener,
  AsyncSendOptions,
  MessageListener,
  Sender,
  SendOptions,
} from "./types";
import { setupWaitForFirst } from "./waitForFirst";

//const { fromEventPattern, merge, Observable, filter, map } = rxjsLib;

// export * from "rxjs/internal/types";

/**
 * Get a messages scope by name.
 */
export function getScope(scope: string) {
  const _asyncOn = scopeAsyncOn(scope);
  const _asyncSend = scopeAsyncSend(scope);
  const _off = scopeOff(scope);
  const _on = scopeOn(scope);
  const _send = scopeSend(scope);

  /* ---------------------- SEND --------------------- */

  /**
   * Send a message. Options are optional.
   *
   * @param [options.async] Set to true to receive a response.
   * @param [options.tabId] Use to send to a tab
   * @param [options.frameId] Use to send to a specific frame in a tab
   */
  function send<T, R>(data: T, options: AsyncSendOptions): Promise<R>; // | undefined meins
  function send<T>(data: T, options: SendOptions): Promise<void>;
  function send<T>(data: T): Promise<void>;

  async function send<T, R>(data: T, options?: SendOptions & { async?: true }) {
    const _options = options || {};
    const { async = false, ...sendOptions } = _options;

    if (async) {
      return _asyncSend(data, sendOptions);
    }
    return _send(data, sendOptions);
  }

  /* -------------------- RECEIVE -------------------- */

  /** Listen for messages. */
  function on<T, R>(
    callback: (data: T, sender: Sender, respond: (data: R) => void) => void
  ): void;
  function on<T>(callback: (data: T, sender: Sender) => void): void;
  function on(callback: MessageListener | AsyncMessageListener) {
    if (isMessageListener(callback)) {
      _on(callback);
    } else {
      _asyncOn(callback);
    }
    // @ts-ignore todo Function eslint error
    function isMessageListener(x: Function): x is MessageListener {
      return x.length < 3;
    }
  }

  /** Remove a message listener from `on`. */
  function off(fn: MessageListener | AsyncMessageListener): void {
    return _off(fn);
  }

  /** Untyped Observable of all messages in scope */
  const stream = merge(
    // use data from 1 obs in an other obs todo mergeMap()
    fromEventPattern<[any, Sender]>(_on, _off),
    fromEventPattern<[any, Sender, (data: any) => void]>(_asyncOn, _off)
  );

  /* ------------------ GET MESSAGE ----------------- */

  const _greetings = new Set();

  /**
   * Get a paired send function and message Observable.
   *
   * @param greeting Unique id for message
   * @param options.async Set true to send a response from the Observable
   */
  function getMessage<T, R>(
    greeting: string,
    options: { async: true }
  ): [
    ((data: T, options?: SendOptions) => Promise<R>) & {
      //| undefined
      toTab: (options?: SendOptions) => Promise<R>;
    },
    Observable<[T, Sender, (response: R) => void]>,
    (predicate?: (x: T) => boolean) => Promise<T>
  ];
  function getMessage<T>(
    greeting: string
  ): [
    ((data: T, options?: SendOptions) => Promise<void>) & {
      //| undefined
      toTab: (options?: SendOptions) => Promise<void>;
    },
    Observable<[T, Sender]>,
    (predicate?: (x: T) => boolean) => Promise<T>
  ];
  function getMessage<T, R>(greeting: string, options?: { async: true }) {
    if (_greetings.has(greeting)) {
      throw new Error("greeting is not unique");
    }

    _greetings.add(greeting);

    const { async } = options || {};

    const _send = (data: T, _options?: SendOptions) => {
      interface WrappedMessage {
        greeting: string;
        data: T;
      }

      _options = _options || ({} as SendOptions);
      let tabId: number | undefined;
      if (typeof _options.tabId === "number") {
        tabId = _options.tabId;
      }
      let frameId: number | undefined;
      if (typeof _options.frameId === "number") {
        frameId = _options.frameId;
      }

      if (async) {
        return send<WrappedMessage, R>(
          { greeting, data },
          { async, tabId, frameId }
        );
      }
      return send<WrappedMessage>({ greeting, data }, { tabId, frameId });
    };

    /** Use this to send a message with no data to a tab */
    _send.toTab = ({ tabId }: { tabId: number }) => {
      interface WrappedMessage {
        greeting: string;
      }

      if (async) {
        return send<WrappedMessage, R>({ greeting }, { async, tabId });
      }
      return send<WrappedMessage>({ greeting }, { tabId });
    };

    if (async) {
      const _stream: Observable<[
        T,
        Sender,
        (response: R) => void
      ]> = stream.pipe(
        // Filter line messages
        filter(isMatchingMessage),
        // Map message to data
        map(([{ data }, s, r]) => [data, s, r]),
        filter((x): x is [T, Sender, (response: R) => void] => x.length === 3)
      );

      return [_send, _stream, setupWaitForFirst(stream)];
    }
    const _stream: Observable<[T, Sender]> = stream.pipe(
      // Filter line messages
      filter(isMatchingMessage),
      // Map message to data
      map(([{ data }, s]) => [data, s]),
      filter((x): x is [T, Sender] => x.length < 3)
    );

    return [_send, _stream, setupWaitForFirst(_stream)];

    function isMatchingMessage([x]: any[]) {
      return x && typeof x === "object" && x.greeting === greeting;
    }
  }

  return {
    send,
    on,
    off,
    stream,
    getMessage,
  };
}
