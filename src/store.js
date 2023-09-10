import {createStore} from 'vuex';

export default createStore({
    state: {
        layers: {
            layer1: {x: 50, y: 50, width: 100, height: 100, color: '#232323'},
            layer2: {x: 100, y: 100, width: 100, height: 100, color: '#4c669f'}
        },
        placements: {
            frontSide: {width: 300, height: 400},
            backSide: {width: 300, height: 400},
            leftSleeve: {width: 100, height: 200},
            rightSleeve: {width: 100, height: 200}
        }
    },
    mutations: {
        updateLayers(state, newLayers) {
            state.layers = newLayers;
        },
        updatePlacements(state, newPlacements) {
            state.placements = {...newPlacements};
        },
    }
});
