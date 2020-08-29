import {getData} from "../../actions/ApiActions.js"; 

test('getData testing in ApiActions', () => {
    expect(getData('POST','')).toBe(undefined);
});