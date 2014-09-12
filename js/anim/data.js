var anim = anim || {};

anim.shapeData = {
    'T': {
        'width': 240,
        'height': 240,
        'vertices': {
            'A': [0, 0],
            'B': [100, 0],
            'C': [140, 0],
            'D': [240, 0],
            'E': [0, 40],
            'F': [100, 40],
            'G': [140, 40],
            'H': [240, 40],
            'I': [140, 140],
            'J': [100, 240],
            'K': [140, 240],
            'L': [100, 140]
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
    },

    'V': {
        'width': 120,
        'height': 200,
        'vertices': {
            'A': [0, 0],
            'B': [40, 0],
            'C': [80, 0],
            'D': [120, 0],
            'E': [20, 97],
            'F': [60, 150],
            'G': [100, 97],
            'H': [40, 240],
            'I': [80, 240]
        },

        'triangles': [
            ['A', 'E', 'B'],
            ['B', 'E', 'F'],
            ['E', 'H', 'F'],
            ['F', 'H', 'I'],
            ['F', 'I', 'G'],
            ['C', 'F', 'G'],
            ['C', 'G', 'D']
        ],

        'external': [
            ['A', 'B', true],
            ['A', 'E', false],
            ['E', 'H', false],
            ['H', 'I', false],
            ['I', 'G', false],
            ['G', 'D', false],
            ['C', 'D', true],
            ['C', 'F', false],
            ['B', 'F', true]
        ]
    }
}
