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

function buildSinglyEvenMagicSquare(n, m_min, step) {
    let magicSquare = Array.from({ length: n }, () => Array(n).fill(0));
    let m = mMin;
    let nMini = Math.floor(n / 2);
    let A = buildOddMagicSquare(nMini, m);
    m += Math.pow(n, 2) / 4;
    let B = buildOddMagicSquare(nMini, m);
    m += Math.pow(n, 2) / 4;
    let C = buildOddMagicSquare(nMini, m);
    m += Math.pow(n, 2) / 4;
    let D = buildOddMagicSquare(nMini, m);

    let middleOfQuarter = Math.floor(n / 4);

    for (let i = 0; i < n / 2; i++) {
        if (i > middleOfQuarter || i < middleOfQuarter) {
            A[i].slice(0, middleOfQuarter).forEach((val, j) => {
                D[i][j] = A[i][j];
                A[i][j] = val;
            });
        } else {
            A[i].slice(1, middleOfQuarter + 1).forEach((val, j) => {
                D[i][j + 1] = A[i][j + 1];
                A[i][j + 1] = val;
            });
        }
    }

    if (n > 6) {
        for (let i = 0; i < n / 2; i++) {
            for (let j = n / 4 + 2; j < n / 2; j++) {
                B[i][j] = C[i][j];
                C[i][j] = B[i][j];
            }
        }
    }

    for (let i = 0; i < nMini; i++) {
        magicSquare[i].splice(0, nMini, ...A[i]);
        magicSquare[i + nMini].splice(nMini, nMini, ...D[i]);
    }

    for (let i = 0; i < nMini; i++) {
        magicSquare[i].splice(nMini, nMini, ...C[i]);
        magicSquare[i + nMini].splice(0, nMini, ...B[i]);
    }

    return magicSquare;
}


function buildDoublyEvenMagicSquare(n, m_min, step) {
    let m = m_min,  m_max = m_min + step * (n**2 - 1)
    let square = new Array(n).fill(0).map(() => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (!(n / 4 - 1 < i && i < 3 * n / 4) || !(n / 4 - 1 < j && j < 3 * n / 4)) {
                if (!(n / 4 - 1 < i && i < 3 * n / 4)) {
                    if (!(n / 4 - 1 < j && j < 3 * n / 4)) {
                        square[i][j] = m;
                    } else {
                        square[i][j] = m_max - m + 2 * m_min - step
                    }
                }
            } else {
                if (n / 4 - 1 < i && i < 3 * n / 4) {
                    if (n / 4 - 1 < j && j < 3 * n / 4) {
                        square[i][j] = m;
                    } else {
                        square[i][j] = m_max - m + 2 * m_min - step
                    }
                }
            }
            m += step;
        }
    }
    
}