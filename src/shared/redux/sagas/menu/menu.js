import { put, delay, all } from 'redux-saga/effects';
import * as actions from '../../actions/menu';
import httpStatusCodes from '../../../constants/httpStatusCodes';
import { httpRequest } from '../../../services/httpRequest.service';
import { getUserRole, generateActionHistoryLogReqHeaders, getQueryParam } from '../../../utils/common/utility';

import actionHeadersLogs from '../../../constants/actionHeaderLogs';

export function* getMenuList() {
    const { roleId } = getUserRole();
    const url = `${window.config.coreApiUrl}menu/side-menu/detail?role_id=${roleId}`;

    if (roleId) {
        try {
            delay(1200);
            const response = yield httpRequest(url, 'GET');
            if (response.status === httpStatusCodes['200']) {
                // removed data due to payload changes
                yield put(actions.setMenuList(response.data.result.data));
            }
        } catch (error) {
            // empty
        }
    }
}

export function* getMenuGrid(data) {
    const { roleId } = getUserRole();
    const url = `${window.config.coreApiUrl}menu`;
    let response = {};
    if (roleId) {
        try {
            const innerPayload = data && data.payload || {};
            if (Object.keys(innerPayload).length == 0) {
                response = yield httpRequest(url, 'GET', {});
                if (response.status === httpStatusCodes['200']) {
                    yield put(actions.setGlobalMenuGrid(response.data));
                }
            }
            else {
                const params = getQueryParam(innerPayload, 'id');
                response = yield httpRequest(url, 'GET', params);
                if (response.status === httpStatusCodes['200']) {
                    yield put(actions.setMenuGrid(response.data));
                }
            }
        } catch (error) {
            // empty
        }
    }
}

export function* addMenu(data) {
    const url = `${window.config.coreApiUrl}menu`;
    const payload = {
        cluster_id: data.payload.cluster_id || '1',
        icon: data.payload.iconPath ? data.payload.iconPath.name : '',
        name: data.payload.menu ? data.payload.menu : '------------',
        role_id: data.payload.role,
        row_num: data.payload.row,
        type: data.payload.type,
        url: data.payload.url ? data.payload.url : '',
        description: data.payload.descriptionText,
        parent_id: data.payload.parentName === 'None' ? 0 : data.payload.parentName,
        expanded: data.payload.expandDefault ? 1 : 0
    };

    try {
        const response = yield httpRequest(url, 'POST', payload, { ...generateActionHistoryLogReqHeaders({ target: payload.name, action: actionHeadersLogs.ADMIN_MENU.CREATE_NEW_MENU.DESC }) });

        if (response.status === httpStatusCodes['200']) {
            yield getMenuGrid({ payload: data.payload.paggingData  });
            yield getMenuList();
        }
    } catch (error) {
        // empty
    }
}

export function* editMenu(data) {
    const url = `${window.config.coreApiUrl}menu`;
    const payload = {
        id: data.payload.id,
        enabled: data.payload.enabled ? 1 : 0,
        cluster_id: data.payload.cluster_id,
        icon: data.payload.iconPath ? data.payload.iconPath.name : '',
        name: data.payload.menu,
        role_id: data.payload.role,
        row_num: data.payload.row,
        type: data.payload.type,
        url: data.payload.url,
        description: data.payload.descriptionText,
        parent_id: data.payload.parentName === 'None' ? '' : data.payload.parentName,
        expanded: data.payload.expandDefault ? 1 : 0
    };

    try {
        const response = yield httpRequest(url, 'PUT', payload, { ...generateActionHistoryLogReqHeaders({ target: payload.name, action: actionHeadersLogs.ADMIN_MENU.EDIT_MENU.DESC }) });
        if (response.status === httpStatusCodes['200']) {
            yield getMenuGrid({ payload: data.payload.paggingData });
            yield getMenuList();
        }
    } catch (error) {
        // empty
    }
}

export function* deleteMenu(data) {
    const url = `${window.config.coreApiUrl}menu`;
    const requestData = {
        id: data.payload.data.id
    };
    const { menuName,paggingData } = data.payload.data;

    try {
        const response = yield httpRequest(url, 'DELETE', requestData,
            { ...generateActionHistoryLogReqHeaders({ target: menuName, action: actionHeadersLogs.ADMIN_MENU.DELETE_MENU.DESC }) });

        if (response.status === httpStatusCodes['200']) {
            yield getMenuGrid({ payload: paggingData });
            yield getMenuList();
            yield put(actions.deleteMenuResponse(response));
        }
    } catch (error) {
        // empty
    }
}
