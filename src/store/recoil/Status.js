// Loading, Fetching 상태 저장
import { atom } from "recoil";

export const fetchingStatus = atom({
  key: "fetchingStatus",
  default: "LOADING",
});
