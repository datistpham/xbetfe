import { call, put } from "redux-saga/effects";
import { getUser } from "../../services/api";
import { setProfileErrorMessage } from "../action/errorActions";
import { isGettingUser } from "../action/loadingActions";
import { getUserSuccess } from "../action/profileActions";
import { GET_USER_START } from "../../constants/actionType";

function* profileSaga({ type, payload }) {
    switch (type) {
        case GET_USER_START:
            try {
                yield put(isGettingUser(true));
                const user = yield call(getUser, payload);

                yield put(isGettingUser(false));
                yield put(setProfileErrorMessage(null));
                yield put(getUserSuccess(user));
            } catch (e) {
                yield put(setProfileErrorMessage(e));
                yield put(isGettingUser(false));
                console.log(e);
            }
            break;
        default:
            throw new Error(`Unexpected action type ${type}.`);
    }
}

export default profileSaga;
