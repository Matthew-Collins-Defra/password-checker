describe('Client call Check', () => {
  test('Get function works as expected', async () => {
    jest.mock('@hapi/wreck')
    const wreck = require('@hapi/wreck')
    const mockWreck = { get: jest.fn((url, options) => { return { payload: '' } }) }
    wreck.defaults.mockReturnValue(mockWreck)
    const clientcall = require('./clientcall')
    await clientcall.get('url')
    expect(mockWreck.get).toHaveBeenCalled()
  })
})
