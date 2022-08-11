import { mock } from '../deps.ts';
import { ChannelEventHandler } from './channel.event-handler.ts';

Deno.test('ChannelEventHandler', async (t) => {
  await t.step({
    name: 'should register listener',
    ignore: Deno.build.os === 'windows',
    fn() {
      const addEventListenerSpy = mock.spy(globalThis, 'addEventListener');

      new ChannelEventHandler(<any> {});

      mock.assertSpyCall(addEventListenerSpy, 0);
    },
  });
});
