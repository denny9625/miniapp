import * as types from './mutation-types'
const matations={
	 /**
	  * state:当前状态树
	  * v: 提交matations时传的参数
	  */
	 [types.SET_OPEN_ID] (state, v) {
		 state.openId = v;
	 },
	 [types.SET_SCENE] (state, v) {
		state.scene = v;
	},
	[types.SET_TOPCLASSWATCHED] (state, v) {
		state.topClasswatchd = v;
	},
	[types.SET_MIDDLECLASSWATCHED] (state, v) {
		state.middleClasswatchd = v;
	},
	[types.SET_PLACE] (state, v) {
		state.place = v;
	},
 
}
 
export default matations