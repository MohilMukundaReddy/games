#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    void generate(vector<vector<char>>& state_store, int start, vector<vector<char>>& board,
                  vector<vector<int>>& columns, vector<vector<int>>& rows, vector<vector<int>>& sub_matrix, int& noof_sol)
    {
        if (start == 81) // base case: we reached the end, return by copying all contents
        {
            noof_sol++;
            for (int i = 0; i < 9; i++) {
                for (int j = 0; j < 9; j++) {
                    board[i][j] = state_store[i][j];
                }
            }
            return;
        }
        int i = start / 9;
        int j = start % 9;
        if (state_store[i][j] == '.')
        {
            for (int k = 1; k <= 9; k++)
            {
                if (columns[i][k - 1] == 0 && rows[j][k - 1] == 0 && sub_matrix[3 * (i / 3) + j / 3][k - 1] == 0)
                {
                    columns[i][k - 1] = 1;
                    rows[j][k - 1] = 1;
                    sub_matrix[3 * (i / 3) + j / 3][k - 1] = 1;
                    state_store[i][j] = k + 48; // convert to char
                    generate(state_store, start + 1, board, columns, rows, sub_matrix, noof_sol);
                    columns[i][k - 1] = 0; // backtracking at already modified
                    rows[j][k - 1] = 0;
                    sub_matrix[3 * (i / 3) + j / 3][k - 1] = 0;
                    state_store[i][j] = '.';
                }
            }
            // if in the middle we can't find any numbers meaning we picked wrong, so we backtrack
            return;
        }
        else
        {
            generate(state_store, start + 1, board, columns, rows, sub_matrix, noof_sol);
            return;
        }
    }

    void solveSudoku(vector<vector<char>>& board) {
        int n = board.size();
        vector<vector<char>> state_store(n, vector<char>(n, '.'));
        // memorization
        vector<vector<int>> columns(9, vector<int>(9, 0)); // 9 columns 9 digits
        vector<vector<int>> rows(9, vector<int>(9, 0)); // 9 rows 9 digits
        vector<vector<int>> sub_matrix(9, vector<int>(9, 0)); // 9 submatrix 9 digits
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] != '.') {
                    columns[i][board[i][j] - '1'] = 1;
                    rows[j][board[i][j] - '1'] = 1;
                    sub_matrix[3 * (i / 3) + j / 3][board[i][j] - '1'] = 1;
                    state_store[i][j] = board[i][j];
                }
            }
        }
        int start = 0;
        int noof_sol = 0;
        generate(state_store, start, board, columns, rows, sub_matrix, noof_sol);
        cout << "Number of solutions: " << noof_sol << endl;
        if (noof_sol > 0) {
            cout << "Solved Sudoku Board:" << endl;
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    cout << board[i][j] << " ";
                }
                cout << endl;
            }
        }
    }
};

int main() {
    vector<vector<char>> board{
        {'5', '3', '.', '.', '7', '.', '.', '.', '.'},
        {'6', '.', '.', '1', '9', '5', '.', '.', '.'},
        {'.', '9', '8', '.', '.', '.', '.', '6', '.'},
        {'8', '.', '.', '.', '6', '.', '.', '.', '3'},
        {'4', '.', '.', '8', '.', '3', '.', '.', '1'},
        {'7', '.', '.', '.', '2', '.', '.', '.', '6'},
        {'.', '6', '.', '.', '.', '.', '2', '8', '.'},
        {'.', '.', '.', '4', '1', '9', '.', '.', '5'},
        {'.', '.', '.', '.', '8', '.', '.', '7', '9'}
    };

    Solution solver;
    solver.solveSudoku(board);

    return 0;
}
