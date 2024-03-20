let nextRotataion = Math.random() < 0.5;

function buildOddMagicSquare(n, m_min, step) {
    let square = new Array(n).fill(0).map(() => new Array(n).fill(0));
    let pos = 0, num = m_min, offset = (n - 1) / 2;
    let x, y;

        while (pos < n) {
            for(let i = 0; i < n; i ++) {
                x = i + pos;
                y = n - i - 1 + pos;

                if (x < offset) x += n;
                if (y < offset) y += n;
                if (x > n + offset - 1) x -= n;
                if (y > n + offset - 1) y -= n;

                square[y - offset][x - offset] = num;
                num += step;
            }
            pos ++;
        }
    return square;
}


function S(a1, d, n) {
    return 0.5 * (2 * a1 + d * (n - 1)) * n;

}

function an(a1, d, n) {
    return a1 + d * (n - 1);

}


function buildSinglyEvenMagicSquare(n, m_min, step) {
    let magicSquare = Array.from({ length: n }, () => Array(n).fill(0));
    let m = m_min;
    let nMini = Math.floor(n / 2);
    
    
    let A = buildOddMagicSquare(nMini, m, step);
    m += an(m_min, step,Math.pow(n, 2) / 4);
    let B = buildOddMagicSquare(nMini, m, step);
    m += an(m_min, step,Math.pow(n, 2) / 4);
    let C = buildOddMagicSquare(nMini, m, step);
    m += an(m_min, step,Math.pow(n, 2) / 4);
    let D = buildOddMagicSquare(nMini, m, step);

    let middleOfQuarter = Math.floor(n / 4);



    for (let i = 0; i < n / 2; i++) {
        if (i > middleOfQuarter || i < middleOfQuarter) {
            A[i].slice(0, middleOfQuarter).forEach((val, j) => {
                val = D[i][j];
                D[i][j] = A[i][j];
                A[i][j] = val;
            });
        } else {
            A[i].slice(0, middleOfQuarter).forEach((val, j) => {
                val = D[i][j + 1];
                D[i][j + 1] = A[i][j + 1];
                A[i][j + 1] = val;
            });
        }
    }

    if (n > 6) {
        for (let i = 0; i < n / 2; i++) {
            for (let j = Math.floor(n / 4) + 2; j < n / 2; j++) {
                val = B[i][j];
                B[i][j] = C[i][j];
                C[i][j] = val;
            }
        }
    }

    for (var i = 0; i < nMini; i++) {
        for (var j = 0; j < nMini; j++) {
            magicSquare[i][j] = A[i][j];

            magicSquare[i + nMini][j + nMini] = B[i][j];

            magicSquare[i][j + nMini] = C[i][j];


            magicSquare[i + nMini][j] = D[i][j];
        }
    }

    

    return magicSquare;
}

function buildDoublyEvenMagicSquare(n, m_min, step) {
    let m = m_min,  m_max = m_min + step * (n**2 - 1)
    let square = new Array(n).fill(0).map(() => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (!(n / 4 - 1 < i && i < 3 * n / 4)) {
                if (!(n / 4 - 1 < j && j < 3 * n / 4)) {
                        square[i][j] = m;
                    } else {
                        square[i][j] = m_max - m + 2 * m_min - step
                    }
                }
                else if (n / 4 - 1 < i < 3 * n / 4) {
                    if (n / 4 - 1 < j && j < 3 * n / 4) {
                        square[i][j] = m;
                    } else {
                        square[i][j] = m_max - m + 2 * m_min - step
                    }

                }
                m += step;
            } 
           
        }

    return square;
}


function isMagicSquare(matrix) {
    console.log(matrix)

    const n = matrix.length;
    if (!matrix.every(row => row.length === n)) {
      return false;
    }

    let sum = 0;
    for (let j = 0; j < n; j++) {
      sum += matrix[0][j];
    }

    for (let i = 1; i < n; i++) {
      let rowSum = 0;
      for (let j = 0; j < n; j++) {
        rowSum += matrix[i][j];
      }
      if (rowSum !== sum) {
        return false;
      }
    }

    for (let j = 0; j < n; j++) {
      let colSum = 0;
      for (let i = 0; i < n; i++) {
        colSum += matrix[i][j];
      }
      if (colSum !== sum) {
        return false;
      }
    }

    let diagSum1 = 0;
    for (let i = 0; i < n; i++) {
      diagSum1 += matrix[i][i];
    }
    if (diagSum1 !== sum) {
      return false;
    }

    let diagSum2 = 0;
    for (let i = 0; i < n; i++) {
      diagSum2 += matrix[i][n - 1 - i];
    }
    if (diagSum2 !== sum) {
      return false;
    }
    

    return true;
  }


class Magic {
    constructor(size = 3, begining = 1, step = 1) {
        this.size = size;
        this.begining = begining;
        this.step = step;
        this.square = new Array(this.size).fill(0).map(() => new Array(this.size).fill(0));

        this.create();

        let rotations = Math.random() < 0.5;
        if (rotations) {
            this.rotate(0);
            this.rotate(1);
        }
        else {
            this.rotate(nextRotataion);
            nextRotataion = nextRotataion ? 0 : 1;
        }
    }

    create() {
        if (this.size % 2 == 0) {
            if(this.size % 4 == 0) {
                this.square = buildDoublyEvenMagicSquare(this.size, this.begining, this.step);
            }
            else {
                this.square = buildSinglyEvenMagicSquare(this.size, this.begining, this.step);
            }
        }
        else {
            this.square = buildOddMagicSquare(this.size, this.begining, this.step);
        }   
        console.log(isMagicSquare(this.square));
    }
    
    getMagicConstant() {
        var c = 0;
        this.square[i].forEach(function(e) {
            c += e;
        })

    }
    rotate(mode = 0) {
        if (mode)
            for (let i = 0; i < this.size - 1; i ++)
                for (let j = 0; j < this.size - i - 1; j ++)
                    [
                        this.square[i][j], this.square[this.size - j - 1][this.size - i - 1]] =
                        [this.square[this.size - j - 1][this.size - i - 1], this.square[i][j]
                        ]

        else
            for (let i = 1; i < this.size; i ++)
                for (let j = 0; j < i; j ++)
                    [this.square[i][j], this.square[j][i]] = [this.square[j][i], this.square[i][j]]
    }                
}
