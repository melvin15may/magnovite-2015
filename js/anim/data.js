var anim = anim || {};

anim.shapeData = {
    'A': {
        'vertices': {
            'A': [0, 0],
            'B': [100, 0],
            'C': [120, 0],
            'D': [220, 0],
            'E': [0, 20],
            'F': [100, 20],
            'G': [120, 20],
            'H': [220, 20],
            'I': [120, 120],
            'J': [100, 220],
            'K': [120, 220],
            'L': [100, 120]
        },

        'triangles': [
            ['A', 'E', 'F'],
            ['A', 'F', 'B'],
            ['B', 'F', 'C'],
            ['C', 'F', 'G'],
            ['C', 'G', 'H'],
            ['C', 'H', 'D'],
            ['F', 'I', 'G'],
            ['F', 'L', 'I'],
            ['L', 'J', 'I'],
            ['J', 'I', 'K']
        ],

        // external edges, flip last value to fix which face
        // is outside (one which bounces)
        'external': [
            ['A', 'B', true],
            ['B', 'C', true],
            ['C', 'D', true],
            ['A', 'E', false],
            ['E', 'F', false],
            ['F', 'L', false],
            ['L', 'J', false],
            ['J', 'K', true],
            ['K', 'I', false],
            ['I', 'G', false],
            ['G', 'H', false],
            ['H', 'D', false]
        ],
    }
}
