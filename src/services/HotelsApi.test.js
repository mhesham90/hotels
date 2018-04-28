import React from 'react';
import HotelsApi from './HotelsApi';

beforeEach(function () {
    global.fetch = jest.fn().mockImplementation(() => {
        var p = new Promise((resolve, reject) => {
            resolve({
                ok: true,
                Id: '123',
                json: function () {
                    return { Id: '123' }
                }
            });
        });
        return p;
    });

});
it("fetch", async function () {
    const response = await HotelsApi.fetchHotels();
    expect(response.Id).toBe('123');
});