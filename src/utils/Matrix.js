function items(collection, rows) {
    const inRow = collection.length / rows
    return collection.map((item, index) => {
        const row =  Math.floor(index / inRow)
        const col = index % inRow
        return {
            color: collection[index],
            col,
            row,
            index,
        };
    })
}

// class Matrix {
//     constructor(collection, rows = 0, cols = 0) {
//         this.matrix = [];
//         for(let row = 0; row < rows; row++) {
//             let rowMatrix = [];
//             for(let col = 0; col < cols; col++) {
//                 const index = row * col;
//                 let colMatrix = {
//                     color: collection[index],
//                     col,
//                     row,
//                     index,
//                 };
//                 rowMatrix.push(colMatrix);
//             }
//             this.matrix.push(rowMatrix);
//         }
//     }
//     getValues() {
//         return this.matrix;
//     }
// }



export default items;