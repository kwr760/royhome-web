import axios from 'axios';
import { ApiConfigs } from '../../../src/contracts/constants/api.constants';
import { ApiDetailsType } from '../../../src/contracts/api/api';
import { callApi } from '../../../src/util/api/call-api';

jest.mock('axios');

describe('client/util/api/call-api', () => {
  it('should call api',  async () => {
    // Arrange
    const api = ApiConfigs.GET_RESUME;
    delete api.authenticated;
    const email = 'kroy760@gmail.com';
    const details = {
      payload: {
        email,
      },
      params: {
        email,
      },
    } as ApiDetailsType;
    const expected = {
      resume: 'resume',
    };
    const expectedCall = {
      'data': JSON.stringify({'email':'kroy760@gmail.com'}),
      'headers': {},
      'method': 'get',
      'url': 'http://api.localhost/resume/kroy760%40gmail.com',
      'withCredentials': true,
    };
    (axios as unknown as jest.Mock).mockResolvedValue(expected);

    // Act
    const result = await callApi(api, details);

    // Assert
    expect(axios).toHaveBeenCalledWith(expectedCall);
    expect(result).toEqual(expected);
  });
  it('should call authenticated api',  async () => {
    // Arrange
    const api = ApiConfigs.GET_RESUME;
    api.authenticated = true;
    const email = 'kroy760@gmail.com';
    const details = {
      payload: {
        email,
      },
      params: {
        email,
      },
      token: ' token',
    } as ApiDetailsType;
    const expected = {
      resume: 'resume',
    };
    const expectedCall = {
      'data': JSON.stringify({'email':'kroy760@gmail.com'}),
      'headers': {},
      'method': 'get',
      'url': 'http://api.localhost/resume/kroy760%40gmail.com',
      'withCredentials': true,
    };
    (axios as unknown as jest.Mock).mockResolvedValue(expected);

    // Act
    const result = await callApi(api, details);

    // Assert
    expect(axios).toHaveBeenCalledWith(expectedCall);
    expect(result).toEqual(expected);
  });
  it('should throw error without token', async () => {
    // Arrange
    const api = ApiConfigs.GET_RESUME;
    api.authenticated = true;
    const email = 'kroy760@gmail.com';
    const details = {
      payload: {
        email,
      },
      params: {
        email,
      },
    } as ApiDetailsType;
    const expected = {
      resume: 'resume',
    };
    const expectedCall = {
      'data': JSON.stringify({'email':'kroy760@gmail.com'}),
      'headers': {},
      'method': 'get',
      'url': 'http://api.localhost/resume/kroy760%40gmail.com',
      'withCredentials': true,
    };
    const expectedError = {
      code: 'API_UNAUTHENTICATED',
      msg: 'Not authenticated to make the api call',
    } as unknown as Error;
    (axios as unknown as jest.Mock).mockResolvedValue(expected);

    // Act
    try {
      await callApi(api, details);
      expect('Should throw error').toBeFalsy();
    } catch (error) {
      expect(error).toEqual(expectedError);
    }

    // Assert
    expect(axios).toHaveBeenCalledWith(expectedCall);
  });
});


