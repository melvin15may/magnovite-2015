var anim = anim || {};

anim.shapeData = {
    'A': {

        // x and y cordinate of the vertice
        'vertices': [
            [0, 0],
            [100, 100],
            [150, 120],
            [200, 160],
            [200, 100],
            [250, 50],
            [300, 50],
            [300, 0]
        ],

        // has the pair of vertices making the edge
        'edges': [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 4],
            [4, 5],
            [5, 6],
            [6, 7],
            [7, 0],
            [2, 4],
            [1, 4],
            [4, 0]
        ],

        // has 3 edge indexes, edges should be in order A-B, B-C, C-A
        // the last array has an object with two attributes,
        // {i} is the index of the outer edge in the triangle
        // {side} depending on true/false specifies which side is the outward
        'triangles': [
            [0, 9, 10, [{i: 0, side: false}]],
            [1, 8, 9, [{i: 0, side: false}]]
        ]
    }
}
