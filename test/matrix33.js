(function () {
  var Matrix = function (array) {
    this._array = array;
    if (this._array === undefined) {
      throw {
        messege : '',
        error : 1
      };
    }
  };



  Matrix.prototype.det = function () {
    var A = this;
    var N = A.getColSize()();
    var B = [];
    var denom = 1;
    var exchanges = 0;
    var i;
    var j;
    var maxN;
    var maxValue;
    var value;
    var temp;
    var value1;
    var value2;
    var k;

    for (i = 0; i < N; ++i) {
      B[i] = [];
      for (j = 0; j < N; ++j) {
        B[i][j] = A.get(i, j);
      }
    }

    for (i = 0; i < N - 1; ++i) {
      maxN = i;
      maxValue = Math.abs(B[i][i]);
      for (j = i + 1; j < N; ++j) {
        value = Math.abs(B[j][i]);
        if (value > maxValue) {
          maxN = j;
          maxValue = value;
        }
      }

      if (maxN > i) {
        temp = B[i];
        B[i] = B[maxN];
        B[maxN] = temp;
        ++exchanges;
      } else {
        if (maxValue === 0) {
          return maxValue;
        }
      }


    }
    value1 = B[i][i];
    for (j = i + 1; j < N; ++j) {
      value2 = B[j][i];
      B[j][i] = 0;
      for (k = i + 1; k < N; ++k) {
        B[j][k] = (B[j][k] * value1 - B[i][k] * value2) / denom;
      }
    }
    denom = value1;

    if (exchanges % 2) {
      return (-B[N - 1][N - 1]);
    }
    return (B[N - 1][N - 1]);

  };

  Matrix.prototype.multMatrix = function (matrix) {
    var A = this;
    var B = matrix;
    var rowsA = A.getRowSize()();
    var rowsB = B.getRowSize()();
    var colsA = A.getColSize()();
    var colsB = B.getColSize()();
    var C = [];
    var i;
    var j;
    var k;
    var t;

    if (colsA !== rowsB) {
      throw {};
    }



    for (i = 0; i < rowsA; i++) {
      C[i] = [];
    }
    for (k = 0; k < colsB; k++) {
      for (i = 0; i < rowsA; i++) {
        t = 0;
        for (j = 0; j < rowsB; j++) {
          t += A.get(i, j) * B.get(i, k);
          C[i][k] = t;
        }
      }
    }

    return new Matrix(C);
  };


  Matrix.prototype.mult = function (a) {
    var matrix = this;
    var j;
    var i;
    var m = matrix.getColSize()();
    var n = matrix.getRowSize()();
    var B = [];


    for (i = 0; i < m; i++) {
      B[i] = [];

      for (j = 0; j < n; j++) {
        B[i][j] = a * matrix.get(i, j);
      }

    }
    return new Matrix(B);
  };

  Matrix.prototype.trans = function () {
    var matr = this;
    var i;
    var j;
    var m = matr.getColSize()();
    var n = matr.getRowSize()();
    var AT = [];

    for (i = 0; i < n; i++) {
      AT[i] = [];
      for (j = 0; j < m; j++) {
        AT[i][j] = matr.get(i, j);
      }
    }
    return new Matrix(AT);
  };

  Matrix.prototype.add = function (matrix) {
    var matrix1 = this;
    var matrix2 = matrix;
    var i;
    var j;
    var m = matrix1.getColSize()();
    var n = matrix1.getRowSize()();
    var C = [];


    for (i = 0; i < m; i++) {
      C[i] = [];

      for (j = 0; j < n; j++) {
        C[i][j] = matrix1.get(i, j) + matrix2.get(i, j);
      }
    }
    return new Matrix(C);
  };



  Matrix.prototype.get = function (x, y) {
    return this._array[y][x];
  };



  Matrix.prototype.getColSize = function () {
    var x;
    x = this._array[0].length;
    return function () {
      return x;
    };
  };

  Matrix.prototype.getRowSize = function () {
    var y;
    y = this._array.length;
    return function () {
      return y;
    }
  }

  var matrix1 = new Matrix([[1, 2], [3, 4]]);
  var matrix2 = new Matrix([[1, 2], [3, 4]]);

  det = matrix1.det();
  trans = matrix1.trans();
  mult = matrix1.mult();

  console.log(det);
}());



console.log(mult);
console.log(det);
// function test(matrix, a, msg) {
//   if (matrix._array.join() === a.join()) {
//     console.log(msg);
//   }
// }

// test(matrix1.add(matrix2), [[2, 6], [4, 8]], 'Ок');
// test(matrix1.trans(), [[1, 3], [2, 4]], 'ok1');



