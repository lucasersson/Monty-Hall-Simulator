import {atom} from 'recoil'
import { recoilPersist } from 'recoil-persist';
import { MontyHallDto } from './types';

const {persistAtom} = recoilPersist()

const resultsRecoilState = atom<MontyHallDto[]>({
  key: "results",
  default: [],
  effects_UNSTABLE: [persistAtom]
});

export {resultsRecoilState}