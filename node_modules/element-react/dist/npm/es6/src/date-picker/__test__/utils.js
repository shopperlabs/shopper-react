import createMockRaf from 'mock-raf';
// import sinon from 'sinon'

export function mockRAf() {
    var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

    var mockRaf = createMockRaf();
    // Stub out your `requestAnimationFrame` method
    global.requestAnimationFrame = mockRaf.raf;
    global.cancelAnimationFrame = function () {};
    // sinon.stub(global, 'requestAnimationFrame').callsFake(mockRaf.raf);
    // Take 10 `requestAnimationFrame` steps (your callback will fire 10 times)
    mockRaf.step({ count: count });
}

export var nativeEvent = { nativeEvent: { stopImmediatePropagation: function stopImmediatePropagation() {} } };