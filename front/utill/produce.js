import produce, { enableES5 } from 'immer';
// immer 익스플로러 호환 해결 위해
export default (...args) => {   
    enableES5();
    return produce(...args);
};