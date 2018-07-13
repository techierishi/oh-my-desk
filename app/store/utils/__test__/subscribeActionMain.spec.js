import Immutable from 'immutable';
import { ipcMain } from 'electron';
import * as controller from 'store/utils/controllers';
import subscribeActionMain from '../subscribeActionMain';

describe('test subscribeActionMain', () => {
  describe('should call ipcMain.on', () => {
    const store = {
      dispatch: jest.fn(),
      getState: jest.fn(),
    };
    const initialState = { mock: 'initial' };
    const nextState = { mock: 'next' };
    const payload = 'mock-payload';
    controller.default = jest.fn();

    store.getState.mockReturnValueOnce(initialState);
    store.getState.mockReturnValueOnce(nextState);

    subscribeActionMain(store);

    it('should call ipcMain correctly', () => {
      expect(ipcMain.on).toHaveBeenCalledTimes(1);
      expect(ipcMain.on).toHaveBeenCalledWith('redux-action', expect.any(Function));
    });

    it('should call ipcMain callback correctly', () => {
      const cb = ipcMain.on.mock.calls[0][1];
      cb('someEvent', payload);


      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(payload);

      expect(controller.default).toHaveBeenCalledTimes(1);
      expect(controller.default).toHaveBeenCalledWith(payload, initialState, nextState);
    });
  });

  it('should match global.getReduxState', () => {
    const initialState = Immutable.fromJS({ share: { mock: 'initial' } });
    const nextState = Immutable.fromJS({ share: { mock: 'next' } });
    const store = {
      getState: jest.fn(),
    };

    store.getState.mockReturnValueOnce(initialState);
    store.getState.mockReturnValueOnce(nextState);

    subscribeActionMain(store);

    expect(global.getReduxState()).toEqual(JSON.stringify(initialState.get('share')));
    expect(store.getState).toHaveBeenCalledTimes(1);

    expect(global.getReduxState()).toEqual(JSON.stringify(nextState.get('share')));
    expect(store.getState).toHaveBeenCalledTimes(2);
  });
});