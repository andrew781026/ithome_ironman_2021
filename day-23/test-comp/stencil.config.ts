import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'test-comp',
  outputTargets: [
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
