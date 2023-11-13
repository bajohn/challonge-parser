import { describe, expect, test, jest } from '@jest/globals';

import { cleanName } from "../../constants/cleanName";



test("cleanName function behaves as expected", async () => {
    const resp = cleanName('Katya')
    expect(resp).toEqual('Katya');
});

