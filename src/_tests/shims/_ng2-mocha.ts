// import * as zone from 'zone.js';
// import {global, FunctionWrapper, isPresent, Type} from 'angular2/src/facade/lang';
// import {ListWrapper} from 'angular2/src/facade/collection';
// import {Injector, Provider, PLATFORM_INITIALIZER} from 'angular2/core';
// import {BaseException} from 'angular2/src/facade/exceptions';
// import * as chai from 'chai';

// let _global: any = <any>(typeof window === 'undefined' ? global :  window);

// export class TestInjector {
//     platformProviders: Array<Type | Provider | any[]> = [];

//     applicationProviders: Array<Type | Provider | any[]> = [];

//     private _instantiated: boolean = false;

//     private _injector: Injector = null;

//     private _providers: Array<Type | Provider | any[]> = [];

//     reset() {
//         this._injector = null;
//         this._providers = [];
//         this._instantiated = false;
//     }

//     addProviders(providers: Array<Type | Provider | any[]>) {
//         if (this._instantiated) {
//             throw new BaseException('Cannot add providers after test injector is instantiated');
//         }
//         this._providers = ListWrapper.concat(this._providers, providers);
//     }

//     createInjector() {
//         let rootInjector = Injector.resolveAndCreate(this.platformProviders);
//         this._injector = rootInjector.resolveAndCreateChild(
//             ListWrapper.concat(this.applicationProviders, this._providers));
//         this._instantiated = true;
//         return this._injector;
//     }

//     execute(fn: FunctionWithParamTokens): any {
//         if (!this._instantiated) {
//             this.createInjector();
//         }
//         return fn.execute(this._injector);
//     }
// }

// export let afterEach: Function = _global.afterEach;
// export let describe: Function = _global.describe;
// export let xdescribe: Function = _global.xdescribe;

// export type SyncTestFn = () => void;
// export type AsyncTestFn = (done: () => void) => void;
// export type AnyTestFn = SyncTestFn | AsyncTestFn;

// let jsmBeforeEach = _global.beforeEach;
// let jsmIt = _global.it;
// let jsmXIt = _global.xit;

// let testInjector: TestInjector = getTestInjector();
// jsmBeforeEach((done) => {
//     if (testInjector) {
//         testInjector.reset();
//     }
//     done();
// });

// export function beforeEachProviders(fn): void {
//     jsmBeforeEach((done) => {
//         let providers = fn();
//         if (!providers) return;
//         try {
//             testInjector.addProviders(providers);
//             done();
//         } catch (e) {
//             throw new Error('beforeEachProviders was called after the injector had ' +
//                 'been used in a beforeEach or it block. This invalidates the ' +
//                 'test injector');
//         }
//     });
// }

// function _isPromiseLike(input): boolean {
//     return input && !!(input.then);
// }


// function runInTestZone(fnToExecute, finishCallback, failCallback): any {
//     let pendingMicrotasks = 0;
//     let pendingTimeouts = [];
//     let ngTestZone = (<zone.Zone>global.zone)
//         .fork({
//             onError:  function (e) {
//                 failCallback(e);
//             },
//             '$run':  function (parentRun) {
//                 return function () {
//                     try {
//                         return parentRun.apply(this, arguments);
//                     } finally {
//                         if (pendingMicrotasks === 0 && pendingTimeouts.length === 0) {
//                             finishCallback();
//                         }
//                     }
//                 };
//             },
//             '$scheduleMicrotask':  function (parentScheduleMicrotask) {
//                 return function (fn) {
//                     pendingMicrotasks++;
//                     let microtask = function () {
//                         try {
//                             fn();
//                         } finally {
//                             pendingMicrotasks--;
//                         }
//                     };
//                     parentScheduleMicrotask.call(this, microtask);
//                 };
//             },
//             '$setTimeout':  function (parentSetTimeout) {
//                 return function (fn: Function, delay: number, ...args) {
//                     let id;
//                     let cb = function () {
//                         fn();
//                         ListWrapper.remove(pendingTimeouts, id);
//                     };
//                     id = parentSetTimeout(cb, delay, args);
//                     pendingTimeouts.push(id);
//                     return id;
//                 };
//             },
//             '$clearTimeout':  function (parentClearTimeout) {
//                 return function (id: number) {
//                     parentClearTimeout(id);
//                     ListWrapper.remove(pendingTimeouts, id);
//                 };
//             },
//         });

//     return ngTestZone.run(fnToExecute);
// }

// function _it(jsmFn: Function, name: string, testFn: FunctionWithParamTokens | AnyTestFn,
//              testTimeOut: number): void {
//     let timeOut = testTimeOut;

//     if (testFn instanceof FunctionWithParamTokens) {
//         jsmFn(name, (done) => {
//             let finishCallback = () => {
//                 // Wait one more event loop to make sure we catch unreturned promises and
//                 // promise rejections.
//                 setTimeout(done, 0);
//             };
//             let returnedTestValue =
//                 runInTestZone(() => testInjector.execute(testFn), finishCallback, (err) => {
//                     throw(err);
//                 });

//             if (testFn.isAsync) {
//                 if (_isPromiseLike(returnedTestValue)) {
//                     (<Promise<any>>returnedTestValue).then(null, (err) => {
//                         throw(err);
//                     });
//                 } else {
//                     throw('Error:  injectAsync was expected to return a promise, but the ' +
//                         ' returned value was:  ' + returnedTestValue);
//                 }
//             } else {
//                 if (!(returnedTestValue === undefined)) {
//                     throw('Error:  inject returned a value. Did you mean to use injectAsync? Returned ' +
//                         'value was:  ' + returnedTestValue);
//                 }
//             }
//         }, timeOut);
//     } else {
//         // The test case doesn't use inject(). ie `it('test', (done) => { ... }));`
//         jsmFn(name, testFn, timeOut);
//     }
// }

// export function beforeEach(fn: FunctionWithParamTokens | AnyTestFn): void {
//     if (fn instanceof FunctionWithParamTokens) {
//         // The test case uses inject(). ie `beforeEach(inject([ClassA], (a) => { ...
//         // }));`
//         jsmBeforeEach((done) => {
//             let finishCallback = () => {
//                 // Wait one more event loop to make sure we catch unreturned promises and
//                 // promise rejections.
//                 setTimeout(done, 0);
//             };

//             let returnedTestValue =
//                 runInTestZone(() => testInjector.execute(fn), finishCallback, chai.expect.fail);
//             if (fn.isAsync) {
//                 if (_isPromiseLike(returnedTestValue)) {
//                     (<Promise<any>>returnedTestValue).then(null, (err) => {
//                         chai.expect.fail(err);
//                     });
//                 } else {
//                     chai.expect.fail('Error:  injectAsync was expected to return a promise, but the ' +
//                         ' returned value was:  ' + returnedTestValue);
//                 }
//             } else {
//                 if (!(returnedTestValue === undefined)) {
//                     chai.expect.fail('Error:  inject returned a value. Did you mean to use injectAsync? Returned ' +
//                         'value was:  ' + returnedTestValue);
//                 }
//             }
//         });
//     } else {
//         if ((<any>fn).length === 0) {
//             jsmBeforeEach(() => {
//                 (<SyncTestFn>fn)();
//             });
//         } else {
//             jsmBeforeEach((done) => {
//                 (<AsyncTestFn>fn)(done);
//             });
//         }
//     }
// }

// export function it(name: string, fn: FunctionWithParamTokens | AnyTestFn,
//                    timeOut: number = null): void {
//     return _it(jsmIt, name, fn, timeOut);
// }

// export function xit(name: string, fn: FunctionWithParamTokens | AnyTestFn,
//                     timeOut: number = null): void {
//     return _it(jsmXIt, name, fn, timeOut);
// }

// let _testInjector: TestInjector = null;

// export function getTestInjector() {
//     if (!_testInjector) {
//         _testInjector = new TestInjector();
//     }
//     return _testInjector;
// }

// export function setBaseTestProviders(platformProviders: Array<Type | Provider | any[]>,
//                                      applicationProviders: Array<Type | Provider | any[]>) {
//     let testInjector = getTestInjector();
//     if (testInjector.platformProviders.length > 0 || testInjector.applicationProviders.length > 0) {
//         throw new BaseException('Cannot set base providers because it has already been called');
//     }
//     testInjector.platformProviders = platformProviders;
//     testInjector.applicationProviders = applicationProviders;
//     let injector = testInjector.createInjector();
//     let inits: Function[] = injector.getOptional(PLATFORM_INITIALIZER);
//     if (isPresent(inits)) {
//         inits.forEach(init => init());
//     }
//     testInjector.reset();
// }

// export function resetBaseTestProviders() {
//     let testInjector = getTestInjector();
//     testInjector.platformProviders = [];
//     testInjector.applicationProviders = [];
//     testInjector.reset();
// }

// export function inject(tokens: any[], fn: Function): FunctionWithParamTokens {
//     return new FunctionWithParamTokens(tokens, fn, false);
// }

// export function injectAsync(tokens: any[], fn: Function): FunctionWithParamTokens {
//     return new FunctionWithParamTokens(tokens, fn, true);
// }

// export class FunctionWithParamTokens {
//     constructor(private _tokens: any[], private _fn: Function, public isAsync: boolean) {
//     }

//     execute(injector: Injector): any {
//         let params = this._tokens.map(t => injector.get(t));
//         return FunctionWrapper.apply(this._fn, params);
//     }

//     hasToken(token: any): boolean {
//         return this._tokens.indexOf(token) > -1;
//     }
// }