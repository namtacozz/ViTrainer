/* ============ evolutions.js — Dữ liệu chuỗi tiến hóa Pokémon ============
 * Sinh tự động từ tools/fetch_evolutions.py dựa trên dữ liệu chính thức PokeAPI.
 * Chứa chuỗi tiến hóa, phân loại (3-stage, 2-stage, single, branch), và
 * độ hiếm Gacha cập nhật theo BST cao nhất của dòng.
 */
G.EVO_CHAINS = {
  "1": {
    "chainId": 1,
    "baseDex": 1,
    "name": "Bulbasaur",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 525,
    "baseRarity": 4,
    "stages": [
      [
        1
      ],
      [
        2
      ],
      [
        3
      ]
    ],
    "members": [
      1,
      2,
      3
    ]
  },
  "4": {
    "chainId": 2,
    "baseDex": 4,
    "name": "Charmander",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 534,
    "baseRarity": 4,
    "stages": [
      [
        4
      ],
      [
        5
      ],
      [
        6
      ]
    ],
    "members": [
      4,
      5,
      6
    ]
  },
  "7": {
    "chainId": 3,
    "baseDex": 7,
    "name": "Squirtle",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        7
      ],
      [
        8
      ],
      [
        9
      ]
    ],
    "members": [
      7,
      8,
      9
    ]
  },
  "10": {
    "chainId": 4,
    "baseDex": 10,
    "name": "Caterpie",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 395,
    "baseRarity": 2,
    "stages": [
      [
        10
      ],
      [
        11
      ],
      [
        12
      ]
    ],
    "members": [
      10,
      11,
      12
    ]
  },
  "13": {
    "chainId": 5,
    "baseDex": 13,
    "name": "Weedle",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 395,
    "baseRarity": 2,
    "stages": [
      [
        13
      ],
      [
        14
      ],
      [
        15
      ]
    ],
    "members": [
      13,
      14,
      15
    ]
  },
  "16": {
    "chainId": 6,
    "baseDex": 16,
    "name": "Pidgey",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 479,
    "baseRarity": 3,
    "stages": [
      [
        16
      ],
      [
        17
      ],
      [
        18
      ]
    ],
    "members": [
      16,
      17,
      18
    ]
  },
  "19": {
    "chainId": 7,
    "baseDex": 19,
    "name": "Rattata",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 413,
    "baseRarity": 3,
    "stages": [
      [
        19
      ],
      [
        20
      ],
      []
    ],
    "members": [
      19,
      20
    ]
  },
  "21": {
    "chainId": 8,
    "baseDex": 21,
    "name": "Spearow",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 442,
    "baseRarity": 3,
    "stages": [
      [
        21
      ],
      [
        22
      ],
      []
    ],
    "members": [
      21,
      22
    ]
  },
  "23": {
    "chainId": 9,
    "baseDex": 23,
    "name": "Ekans",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 448,
    "baseRarity": 3,
    "stages": [
      [
        23
      ],
      [
        24
      ],
      []
    ],
    "members": [
      23,
      24
    ]
  },
  "172": {
    "chainId": 10,
    "baseDex": 172,
    "name": "Pichu",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 485,
    "baseRarity": 3,
    "stages": [
      [
        172
      ],
      [
        25
      ],
      [
        26
      ]
    ],
    "members": [
      172,
      25,
      26
    ]
  },
  "27": {
    "chainId": 11,
    "baseDex": 27,
    "name": "Sandshrew",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 450,
    "baseRarity": 3,
    "stages": [
      [
        27
      ],
      [
        28
      ],
      []
    ],
    "members": [
      27,
      28
    ]
  },
  "29": {
    "chainId": 12,
    "baseDex": 29,
    "name": "Nidoran♀",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 505,
    "baseRarity": 4,
    "stages": [
      [
        29
      ],
      [
        30
      ],
      [
        31
      ]
    ],
    "members": [
      29,
      30,
      31
    ]
  },
  "32": {
    "chainId": 13,
    "baseDex": 32,
    "name": "Nidoran♂",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 505,
    "baseRarity": 4,
    "stages": [
      [
        32
      ],
      [
        33
      ],
      [
        34
      ]
    ],
    "members": [
      32,
      33,
      34
    ]
  },
  "173": {
    "chainId": 14,
    "baseDex": 173,
    "name": "Cleffa",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 483,
    "baseRarity": 3,
    "stages": [
      [
        173
      ],
      [
        35
      ],
      [
        36
      ]
    ],
    "members": [
      173,
      35,
      36
    ]
  },
  "37": {
    "chainId": 15,
    "baseDex": 37,
    "name": "Vulpix",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 505,
    "baseRarity": 4,
    "stages": [
      [
        37
      ],
      [
        38
      ],
      []
    ],
    "members": [
      37,
      38
    ]
  },
  "174": {
    "chainId": 16,
    "baseDex": 174,
    "name": "Igglybuff",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 435,
    "baseRarity": 3,
    "stages": [
      [
        174
      ],
      [
        39
      ],
      [
        40
      ]
    ],
    "members": [
      174,
      39,
      40
    ]
  },
  "41": {
    "chainId": 17,
    "baseDex": 41,
    "name": "Zubat",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 535,
    "baseRarity": 4,
    "stages": [
      [
        41
      ],
      [
        42
      ],
      [
        169
      ]
    ],
    "members": [
      41,
      42,
      169
    ]
  },
  "43": {
    "chainId": 18,
    "baseDex": 43,
    "name": "Oddish",
    "type": "branch",
    "maxStage": 3,
    "maxBst": 490,
    "baseRarity": 3,
    "stages": [
      [
        43
      ],
      [
        44
      ],
      [
        45,
        182
      ]
    ],
    "members": [
      43,
      44,
      45,
      182
    ]
  },
  "46": {
    "chainId": 19,
    "baseDex": 46,
    "name": "Paras",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 405,
    "baseRarity": 2,
    "stages": [
      [
        46
      ],
      [
        47
      ],
      []
    ],
    "members": [
      46,
      47
    ]
  },
  "48": {
    "chainId": 20,
    "baseDex": 48,
    "name": "Venonat",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 450,
    "baseRarity": 3,
    "stages": [
      [
        48
      ],
      [
        49
      ],
      []
    ],
    "members": [
      48,
      49
    ]
  },
  "50": {
    "chainId": 21,
    "baseDex": 50,
    "name": "Diglett",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 425,
    "baseRarity": 3,
    "stages": [
      [
        50
      ],
      [
        51
      ],
      []
    ],
    "members": [
      50,
      51
    ]
  },
  "52": {
    "chainId": 22,
    "baseDex": 52,
    "name": "Meowth",
    "type": "branch",
    "maxStage": 2,
    "maxBst": 440,
    "baseRarity": 3,
    "stages": [
      [
        52
      ],
      [
        53,
        863
      ],
      []
    ],
    "members": [
      52,
      53,
      863
    ]
  },
  "54": {
    "chainId": 23,
    "baseDex": 54,
    "name": "Psyduck",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        54
      ],
      [
        55
      ],
      []
    ],
    "members": [
      54,
      55
    ]
  },
  "56": {
    "chainId": 24,
    "baseDex": 56,
    "name": "Mankey",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 535,
    "baseRarity": 4,
    "stages": [
      [
        56
      ],
      [
        57
      ],
      [
        979
      ]
    ],
    "members": [
      56,
      57,
      979
    ]
  },
  "58": {
    "chainId": 25,
    "baseDex": 58,
    "name": "Growlithe",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 555,
    "baseRarity": 4,
    "stages": [
      [
        58
      ],
      [
        59
      ],
      []
    ],
    "members": [
      58,
      59
    ]
  },
  "60": {
    "chainId": 26,
    "baseDex": 60,
    "name": "Poliwag",
    "type": "branch",
    "maxStage": 3,
    "maxBst": 510,
    "baseRarity": 4,
    "stages": [
      [
        60
      ],
      [
        61
      ],
      [
        62,
        186
      ]
    ],
    "members": [
      60,
      61,
      62,
      186
    ]
  },
  "63": {
    "chainId": 27,
    "baseDex": 63,
    "name": "Abra",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        63
      ],
      [
        64
      ],
      [
        65
      ]
    ],
    "members": [
      63,
      64,
      65
    ]
  },
  "66": {
    "chainId": 28,
    "baseDex": 66,
    "name": "Machop",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 505,
    "baseRarity": 4,
    "stages": [
      [
        66
      ],
      [
        67
      ],
      [
        68
      ]
    ],
    "members": [
      66,
      67,
      68
    ]
  },
  "69": {
    "chainId": 29,
    "baseDex": 69,
    "name": "Bellsprout",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 490,
    "baseRarity": 3,
    "stages": [
      [
        69
      ],
      [
        70
      ],
      [
        71
      ]
    ],
    "members": [
      69,
      70,
      71
    ]
  },
  "72": {
    "chainId": 30,
    "baseDex": 72,
    "name": "Tentacool",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 515,
    "baseRarity": 4,
    "stages": [
      [
        72
      ],
      [
        73
      ],
      []
    ],
    "members": [
      72,
      73
    ]
  },
  "74": {
    "chainId": 31,
    "baseDex": 74,
    "name": "Geodude",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 495,
    "baseRarity": 4,
    "stages": [
      [
        74
      ],
      [
        75
      ],
      [
        76
      ]
    ],
    "members": [
      74,
      75,
      76
    ]
  },
  "77": {
    "chainId": 32,
    "baseDex": 77,
    "name": "Ponyta",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        77
      ],
      [
        78
      ],
      []
    ],
    "members": [
      77,
      78
    ]
  },
  "79": {
    "chainId": 33,
    "baseDex": 79,
    "name": "Slowpoke",
    "type": "branch",
    "maxStage": 2,
    "maxBst": 490,
    "baseRarity": 3,
    "stages": [
      [
        79
      ],
      [
        80,
        199
      ],
      []
    ],
    "members": [
      79,
      80,
      199
    ]
  },
  "81": {
    "chainId": 34,
    "baseDex": 81,
    "name": "Magnemite",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 535,
    "baseRarity": 4,
    "stages": [
      [
        81
      ],
      [
        82
      ],
      [
        462
      ]
    ],
    "members": [
      81,
      82,
      462
    ]
  },
  "83": {
    "chainId": 35,
    "baseDex": 83,
    "name": "Farfetch’d",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 377,
    "baseRarity": 2,
    "stages": [
      [
        83
      ],
      [
        865
      ],
      []
    ],
    "members": [
      83,
      865
    ]
  },
  "84": {
    "chainId": 36,
    "baseDex": 84,
    "name": "Doduo",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 470,
    "baseRarity": 3,
    "stages": [
      [
        84
      ],
      [
        85
      ],
      []
    ],
    "members": [
      84,
      85
    ]
  },
  "86": {
    "chainId": 37,
    "baseDex": 86,
    "name": "Seel",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 475,
    "baseRarity": 3,
    "stages": [
      [
        86
      ],
      [
        87
      ],
      []
    ],
    "members": [
      86,
      87
    ]
  },
  "88": {
    "chainId": 38,
    "baseDex": 88,
    "name": "Grimer",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        88
      ],
      [
        89
      ],
      []
    ],
    "members": [
      88,
      89
    ]
  },
  "90": {
    "chainId": 39,
    "baseDex": 90,
    "name": "Shellder",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 525,
    "baseRarity": 4,
    "stages": [
      [
        90
      ],
      [
        91
      ],
      []
    ],
    "members": [
      90,
      91
    ]
  },
  "92": {
    "chainId": 40,
    "baseDex": 92,
    "name": "Gastly",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        92
      ],
      [
        93
      ],
      [
        94
      ]
    ],
    "members": [
      92,
      93,
      94
    ]
  },
  "95": {
    "chainId": 41,
    "baseDex": 95,
    "name": "Onix",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 510,
    "baseRarity": 4,
    "stages": [
      [
        95
      ],
      [
        208
      ],
      []
    ],
    "members": [
      95,
      208
    ]
  },
  "96": {
    "chainId": 42,
    "baseDex": 96,
    "name": "Drowzee",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 483,
    "baseRarity": 3,
    "stages": [
      [
        96
      ],
      [
        97
      ],
      []
    ],
    "members": [
      96,
      97
    ]
  },
  "98": {
    "chainId": 43,
    "baseDex": 98,
    "name": "Krabby",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 475,
    "baseRarity": 3,
    "stages": [
      [
        98
      ],
      [
        99
      ],
      []
    ],
    "members": [
      98,
      99
    ]
  },
  "100": {
    "chainId": 44,
    "baseDex": 100,
    "name": "Voltorb",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 490,
    "baseRarity": 3,
    "stages": [
      [
        100
      ],
      [
        101
      ],
      []
    ],
    "members": [
      100,
      101
    ]
  },
  "102": {
    "chainId": 45,
    "baseDex": 102,
    "name": "Exeggcute",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        102
      ],
      [
        103
      ],
      []
    ],
    "members": [
      102,
      103
    ]
  },
  "104": {
    "chainId": 46,
    "baseDex": 104,
    "name": "Cubone",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 425,
    "baseRarity": 3,
    "stages": [
      [
        104
      ],
      [
        105
      ],
      []
    ],
    "members": [
      104,
      105
    ]
  },
  "236": {
    "chainId": 47,
    "baseDex": 236,
    "name": "Tyrogue",
    "type": "branch",
    "maxStage": 2,
    "maxBst": 455,
    "baseRarity": 3,
    "stages": [
      [
        236
      ],
      [
        106,
        107,
        237
      ],
      []
    ],
    "members": [
      236,
      106,
      107,
      237
    ]
  },
  "108": {
    "chainId": 48,
    "baseDex": 108,
    "name": "Lickitung",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 515,
    "baseRarity": 4,
    "stages": [
      [
        108
      ],
      [
        463
      ],
      []
    ],
    "members": [
      108,
      463
    ]
  },
  "109": {
    "chainId": 49,
    "baseDex": 109,
    "name": "Koffing",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 490,
    "baseRarity": 3,
    "stages": [
      [
        109
      ],
      [
        110
      ],
      []
    ],
    "members": [
      109,
      110
    ]
  },
  "111": {
    "chainId": 50,
    "baseDex": 111,
    "name": "Rhyhorn",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 535,
    "baseRarity": 4,
    "stages": [
      [
        111
      ],
      [
        112
      ],
      [
        464
      ]
    ],
    "members": [
      111,
      112,
      464
    ]
  },
  "440": {
    "chainId": 51,
    "baseDex": 440,
    "name": "Happiny",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 540,
    "baseRarity": 4,
    "stages": [
      [
        440
      ],
      [
        113
      ],
      [
        242
      ]
    ],
    "members": [
      440,
      113,
      242
    ]
  },
  "114": {
    "chainId": 52,
    "baseDex": 114,
    "name": "Tangela",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 535,
    "baseRarity": 4,
    "stages": [
      [
        114
      ],
      [
        465
      ],
      []
    ],
    "members": [
      114,
      465
    ]
  },
  "115": {
    "chainId": 53,
    "baseDex": 115,
    "name": "Kangaskhan",
    "type": "single",
    "maxStage": 1,
    "maxBst": 490,
    "baseRarity": 3,
    "stages": [
      [
        115
      ],
      [],
      []
    ],
    "members": [
      115
    ]
  },
  "116": {
    "chainId": 54,
    "baseDex": 116,
    "name": "Horsea",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 540,
    "baseRarity": 4,
    "stages": [
      [
        116
      ],
      [
        117
      ],
      [
        230
      ]
    ],
    "members": [
      116,
      117,
      230
    ]
  },
  "118": {
    "chainId": 55,
    "baseDex": 118,
    "name": "Goldeen",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 450,
    "baseRarity": 3,
    "stages": [
      [
        118
      ],
      [
        119
      ],
      []
    ],
    "members": [
      118,
      119
    ]
  },
  "120": {
    "chainId": 56,
    "baseDex": 120,
    "name": "Staryu",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 520,
    "baseRarity": 4,
    "stages": [
      [
        120
      ],
      [
        121
      ],
      []
    ],
    "members": [
      120,
      121
    ]
  },
  "439": {
    "chainId": 57,
    "baseDex": 439,
    "name": "Mime Jr.",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 460,
    "baseRarity": 3,
    "stages": [
      [
        439
      ],
      [
        122
      ],
      [
        866
      ]
    ],
    "members": [
      439,
      122,
      866
    ]
  },
  "123": {
    "chainId": 58,
    "baseDex": 123,
    "name": "Scyther",
    "type": "branch",
    "maxStage": 2,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        123
      ],
      [
        212,
        900
      ],
      []
    ],
    "members": [
      123,
      212,
      900
    ]
  },
  "238": {
    "chainId": 59,
    "baseDex": 238,
    "name": "Smoochum",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 455,
    "baseRarity": 3,
    "stages": [
      [
        238
      ],
      [
        124
      ],
      []
    ],
    "members": [
      238,
      124
    ]
  },
  "239": {
    "chainId": 60,
    "baseDex": 239,
    "name": "Elekid",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 540,
    "baseRarity": 4,
    "stages": [
      [
        239
      ],
      [
        125
      ],
      [
        466
      ]
    ],
    "members": [
      239,
      125,
      466
    ]
  },
  "240": {
    "chainId": 61,
    "baseDex": 240,
    "name": "Magby",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 540,
    "baseRarity": 4,
    "stages": [
      [
        240
      ],
      [
        126
      ],
      [
        467
      ]
    ],
    "members": [
      240,
      126,
      467
    ]
  },
  "127": {
    "chainId": 62,
    "baseDex": 127,
    "name": "Pinsir",
    "type": "single",
    "maxStage": 1,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        127
      ],
      [],
      []
    ],
    "members": [
      127
    ]
  },
  "128": {
    "chainId": 63,
    "baseDex": 128,
    "name": "Tauros",
    "type": "single",
    "maxStage": 1,
    "maxBst": 490,
    "baseRarity": 3,
    "stages": [
      [
        128
      ],
      [],
      []
    ],
    "members": [
      128
    ]
  },
  "129": {
    "chainId": 64,
    "baseDex": 129,
    "name": "Magikarp",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 540,
    "baseRarity": 4,
    "stages": [
      [
        129
      ],
      [
        130
      ],
      []
    ],
    "members": [
      129,
      130
    ]
  },
  "131": {
    "chainId": 65,
    "baseDex": 131,
    "name": "Lapras",
    "type": "single",
    "maxStage": 1,
    "maxBst": 535,
    "baseRarity": 4,
    "stages": [
      [
        131
      ],
      [],
      []
    ],
    "members": [
      131
    ]
  },
  "132": {
    "chainId": 66,
    "baseDex": 132,
    "name": "Ditto",
    "type": "single",
    "maxStage": 1,
    "maxBst": 288,
    "baseRarity": 1,
    "stages": [
      [
        132
      ],
      [],
      []
    ],
    "members": [
      132
    ]
  },
  "133": {
    "chainId": 67,
    "baseDex": 133,
    "name": "Eevee",
    "type": "branch",
    "maxStage": 2,
    "maxBst": 525,
    "baseRarity": 4,
    "stages": [
      [
        133
      ],
      [
        134,
        135,
        136,
        196,
        197,
        470,
        471,
        700
      ],
      []
    ],
    "members": [
      133,
      134,
      135,
      136,
      196,
      197,
      470,
      471,
      700
    ]
  },
  "137": {
    "chainId": 68,
    "baseDex": 137,
    "name": "Porygon",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 535,
    "baseRarity": 4,
    "stages": [
      [
        137
      ],
      [
        233
      ],
      [
        474
      ]
    ],
    "members": [
      137,
      233,
      474
    ]
  },
  "138": {
    "chainId": 69,
    "baseDex": 138,
    "name": "Omanyte",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 495,
    "baseRarity": 4,
    "stages": [
      [
        138
      ],
      [
        139
      ],
      []
    ],
    "members": [
      138,
      139
    ]
  },
  "140": {
    "chainId": 70,
    "baseDex": 140,
    "name": "Kabuto",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 495,
    "baseRarity": 4,
    "stages": [
      [
        140
      ],
      [
        141
      ],
      []
    ],
    "members": [
      140,
      141
    ]
  },
  "142": {
    "chainId": 71,
    "baseDex": 142,
    "name": "Aerodactyl",
    "type": "single",
    "maxStage": 1,
    "maxBst": 515,
    "baseRarity": 4,
    "stages": [
      [
        142
      ],
      [],
      []
    ],
    "members": [
      142
    ]
  },
  "446": {
    "chainId": 72,
    "baseDex": 446,
    "name": "Munchlax",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 540,
    "baseRarity": 4,
    "stages": [
      [
        446
      ],
      [
        143
      ],
      []
    ],
    "members": [
      446,
      143
    ]
  },
  "144": {
    "chainId": 73,
    "baseDex": 144,
    "name": "Articuno",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        144
      ],
      [],
      []
    ],
    "members": [
      144
    ]
  },
  "145": {
    "chainId": 74,
    "baseDex": 145,
    "name": "Zapdos",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        145
      ],
      [],
      []
    ],
    "members": [
      145
    ]
  },
  "146": {
    "chainId": 75,
    "baseDex": 146,
    "name": "Moltres",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        146
      ],
      [],
      []
    ],
    "members": [
      146
    ]
  },
  "147": {
    "chainId": 76,
    "baseDex": 147,
    "name": "Dratini",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        147
      ],
      [
        148
      ],
      [
        149
      ]
    ],
    "members": [
      147,
      148,
      149
    ]
  },
  "150": {
    "chainId": 77,
    "baseDex": 150,
    "name": "Mewtwo",
    "type": "single",
    "maxStage": 1,
    "maxBst": 680,
    "baseRarity": 5,
    "stages": [
      [
        150
      ],
      [],
      []
    ],
    "members": [
      150
    ]
  },
  "151": {
    "chainId": 78,
    "baseDex": 151,
    "name": "Mew",
    "type": "single",
    "maxStage": 1,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        151
      ],
      [],
      []
    ],
    "members": [
      151
    ]
  },
  "152": {
    "chainId": 79,
    "baseDex": 152,
    "name": "Chikorita",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 525,
    "baseRarity": 4,
    "stages": [
      [
        152
      ],
      [
        153
      ],
      [
        154
      ]
    ],
    "members": [
      152,
      153,
      154
    ]
  },
  "155": {
    "chainId": 80,
    "baseDex": 155,
    "name": "Cyndaquil",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 534,
    "baseRarity": 4,
    "stages": [
      [
        155
      ],
      [
        156
      ],
      [
        157
      ]
    ],
    "members": [
      155,
      156,
      157
    ]
  },
  "158": {
    "chainId": 81,
    "baseDex": 158,
    "name": "Totodile",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        158
      ],
      [
        159
      ],
      [
        160
      ]
    ],
    "members": [
      158,
      159,
      160
    ]
  },
  "161": {
    "chainId": 82,
    "baseDex": 161,
    "name": "Sentret",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 415,
    "baseRarity": 3,
    "stages": [
      [
        161
      ],
      [
        162
      ],
      []
    ],
    "members": [
      161,
      162
    ]
  },
  "163": {
    "chainId": 83,
    "baseDex": 163,
    "name": "Hoothoot",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 452,
    "baseRarity": 3,
    "stages": [
      [
        163
      ],
      [
        164
      ],
      []
    ],
    "members": [
      163,
      164
    ]
  },
  "165": {
    "chainId": 84,
    "baseDex": 165,
    "name": "Ledyba",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 390,
    "baseRarity": 2,
    "stages": [
      [
        165
      ],
      [
        166
      ],
      []
    ],
    "members": [
      165,
      166
    ]
  },
  "167": {
    "chainId": 85,
    "baseDex": 167,
    "name": "Spinarak",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 400,
    "baseRarity": 2,
    "stages": [
      [
        167
      ],
      [
        168
      ],
      []
    ],
    "members": [
      167,
      168
    ]
  },
  "170": {
    "chainId": 86,
    "baseDex": 170,
    "name": "Chinchou",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 460,
    "baseRarity": 3,
    "stages": [
      [
        170
      ],
      [
        171
      ],
      []
    ],
    "members": [
      170,
      171
    ]
  },
  "175": {
    "chainId": 87,
    "baseDex": 175,
    "name": "Togepi",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 545,
    "baseRarity": 4,
    "stages": [
      [
        175
      ],
      [
        176
      ],
      [
        468
      ]
    ],
    "members": [
      175,
      176,
      468
    ]
  },
  "177": {
    "chainId": 88,
    "baseDex": 177,
    "name": "Natu",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 470,
    "baseRarity": 3,
    "stages": [
      [
        177
      ],
      [
        178
      ],
      []
    ],
    "members": [
      177,
      178
    ]
  },
  "179": {
    "chainId": 89,
    "baseDex": 179,
    "name": "Mareep",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 510,
    "baseRarity": 4,
    "stages": [
      [
        179
      ],
      [
        180
      ],
      [
        181
      ]
    ],
    "members": [
      179,
      180,
      181
    ]
  },
  "298": {
    "chainId": 90,
    "baseDex": 298,
    "name": "Azurill",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 420,
    "baseRarity": 3,
    "stages": [
      [
        298
      ],
      [
        183
      ],
      [
        184
      ]
    ],
    "members": [
      298,
      183,
      184
    ]
  },
  "438": {
    "chainId": 91,
    "baseDex": 438,
    "name": "Bonsly",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 410,
    "baseRarity": 3,
    "stages": [
      [
        438
      ],
      [
        185
      ],
      []
    ],
    "members": [
      438,
      185
    ]
  },
  "187": {
    "chainId": 92,
    "baseDex": 187,
    "name": "Hoppip",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 460,
    "baseRarity": 3,
    "stages": [
      [
        187
      ],
      [
        188
      ],
      [
        189
      ]
    ],
    "members": [
      187,
      188,
      189
    ]
  },
  "190": {
    "chainId": 93,
    "baseDex": 190,
    "name": "Aipom",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 482,
    "baseRarity": 3,
    "stages": [
      [
        190
      ],
      [
        424
      ],
      []
    ],
    "members": [
      190,
      424
    ]
  },
  "191": {
    "chainId": 94,
    "baseDex": 191,
    "name": "Sunkern",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 425,
    "baseRarity": 3,
    "stages": [
      [
        191
      ],
      [
        192
      ],
      []
    ],
    "members": [
      191,
      192
    ]
  },
  "193": {
    "chainId": 95,
    "baseDex": 193,
    "name": "Yanma",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 515,
    "baseRarity": 4,
    "stages": [
      [
        193
      ],
      [
        469
      ],
      []
    ],
    "members": [
      193,
      469
    ]
  },
  "194": {
    "chainId": 96,
    "baseDex": 194,
    "name": "Wooper",
    "type": "branch",
    "maxStage": 2,
    "maxBst": 430,
    "baseRarity": 3,
    "stages": [
      [
        194
      ],
      [
        195,
        980
      ],
      []
    ],
    "members": [
      194,
      195,
      980
    ]
  },
  "198": {
    "chainId": 97,
    "baseDex": 198,
    "name": "Murkrow",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 505,
    "baseRarity": 4,
    "stages": [
      [
        198
      ],
      [
        430
      ],
      []
    ],
    "members": [
      198,
      430
    ]
  },
  "200": {
    "chainId": 98,
    "baseDex": 200,
    "name": "Misdreavus",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 495,
    "baseRarity": 4,
    "stages": [
      [
        200
      ],
      [
        429
      ],
      []
    ],
    "members": [
      200,
      429
    ]
  },
  "201": {
    "chainId": 99,
    "baseDex": 201,
    "name": "Unown",
    "type": "single",
    "maxStage": 1,
    "maxBst": 336,
    "baseRarity": 2,
    "stages": [
      [
        201
      ],
      [],
      []
    ],
    "members": [
      201
    ]
  },
  "360": {
    "chainId": 100,
    "baseDex": 360,
    "name": "Wynaut",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 405,
    "baseRarity": 2,
    "stages": [
      [
        360
      ],
      [
        202
      ],
      []
    ],
    "members": [
      360,
      202
    ]
  },
  "203": {
    "chainId": 101,
    "baseDex": 203,
    "name": "Girafarig",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 520,
    "baseRarity": 4,
    "stages": [
      [
        203
      ],
      [
        981
      ],
      []
    ],
    "members": [
      203,
      981
    ]
  },
  "204": {
    "chainId": 102,
    "baseDex": 204,
    "name": "Pineco",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 465,
    "baseRarity": 3,
    "stages": [
      [
        204
      ],
      [
        205
      ],
      []
    ],
    "members": [
      204,
      205
    ]
  },
  "206": {
    "chainId": 103,
    "baseDex": 206,
    "name": "Dunsparce",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 520,
    "baseRarity": 4,
    "stages": [
      [
        206
      ],
      [
        982
      ],
      []
    ],
    "members": [
      206,
      982
    ]
  },
  "207": {
    "chainId": 104,
    "baseDex": 207,
    "name": "Gligar",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 510,
    "baseRarity": 4,
    "stages": [
      [
        207
      ],
      [
        472
      ],
      []
    ],
    "members": [
      207,
      472
    ]
  },
  "209": {
    "chainId": 105,
    "baseDex": 209,
    "name": "Snubbull",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 450,
    "baseRarity": 3,
    "stages": [
      [
        209
      ],
      [
        210
      ],
      []
    ],
    "members": [
      209,
      210
    ]
  },
  "211": {
    "chainId": 106,
    "baseDex": 211,
    "name": "Qwilfish",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 510,
    "baseRarity": 4,
    "stages": [
      [
        211
      ],
      [
        904
      ],
      []
    ],
    "members": [
      211,
      904
    ]
  },
  "213": {
    "chainId": 107,
    "baseDex": 213,
    "name": "Shuckle",
    "type": "single",
    "maxStage": 1,
    "maxBst": 505,
    "baseRarity": 4,
    "stages": [
      [
        213
      ],
      [],
      []
    ],
    "members": [
      213
    ]
  },
  "214": {
    "chainId": 108,
    "baseDex": 214,
    "name": "Heracross",
    "type": "single",
    "maxStage": 1,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        214
      ],
      [],
      []
    ],
    "members": [
      214
    ]
  },
  "215": {
    "chainId": 109,
    "baseDex": 215,
    "name": "Sneasel",
    "type": "branch",
    "maxStage": 2,
    "maxBst": 510,
    "baseRarity": 4,
    "stages": [
      [
        215
      ],
      [
        461,
        903
      ],
      []
    ],
    "members": [
      215,
      461,
      903
    ]
  },
  "216": {
    "chainId": 110,
    "baseDex": 216,
    "name": "Teddiursa",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 550,
    "baseRarity": 4,
    "stages": [
      [
        216
      ],
      [
        217
      ],
      [
        901
      ]
    ],
    "members": [
      216,
      217,
      901
    ]
  },
  "218": {
    "chainId": 111,
    "baseDex": 218,
    "name": "Slugma",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 430,
    "baseRarity": 3,
    "stages": [
      [
        218
      ],
      [
        219
      ],
      []
    ],
    "members": [
      218,
      219
    ]
  },
  "220": {
    "chainId": 112,
    "baseDex": 220,
    "name": "Swinub",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        220
      ],
      [
        221
      ],
      [
        473
      ]
    ],
    "members": [
      220,
      221,
      473
    ]
  },
  "222": {
    "chainId": 113,
    "baseDex": 222,
    "name": "Corsola",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 510,
    "baseRarity": 4,
    "stages": [
      [
        222
      ],
      [
        864
      ],
      []
    ],
    "members": [
      222,
      864
    ]
  },
  "223": {
    "chainId": 114,
    "baseDex": 223,
    "name": "Remoraid",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 480,
    "baseRarity": 3,
    "stages": [
      [
        223
      ],
      [
        224
      ],
      []
    ],
    "members": [
      223,
      224
    ]
  },
  "225": {
    "chainId": 115,
    "baseDex": 225,
    "name": "Delibird",
    "type": "single",
    "maxStage": 1,
    "maxBst": 330,
    "baseRarity": 2,
    "stages": [
      [
        225
      ],
      [],
      []
    ],
    "members": [
      225
    ]
  },
  "458": {
    "chainId": 116,
    "baseDex": 458,
    "name": "Mantyke",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 485,
    "baseRarity": 3,
    "stages": [
      [
        458
      ],
      [
        226
      ],
      []
    ],
    "members": [
      458,
      226
    ]
  },
  "227": {
    "chainId": 117,
    "baseDex": 227,
    "name": "Skarmory",
    "type": "single",
    "maxStage": 1,
    "maxBst": 465,
    "baseRarity": 3,
    "stages": [
      [
        227
      ],
      [],
      []
    ],
    "members": [
      227
    ]
  },
  "228": {
    "chainId": 118,
    "baseDex": 228,
    "name": "Houndour",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        228
      ],
      [
        229
      ],
      []
    ],
    "members": [
      228,
      229
    ]
  },
  "231": {
    "chainId": 119,
    "baseDex": 231,
    "name": "Phanpy",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        231
      ],
      [
        232
      ],
      []
    ],
    "members": [
      231,
      232
    ]
  },
  "234": {
    "chainId": 120,
    "baseDex": 234,
    "name": "Stantler",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 525,
    "baseRarity": 4,
    "stages": [
      [
        234
      ],
      [
        899
      ],
      []
    ],
    "members": [
      234,
      899
    ]
  },
  "235": {
    "chainId": 121,
    "baseDex": 235,
    "name": "Smeargle",
    "type": "single",
    "maxStage": 1,
    "maxBst": 250,
    "baseRarity": 1,
    "stages": [
      [
        235
      ],
      [],
      []
    ],
    "members": [
      235
    ]
  },
  "241": {
    "chainId": 122,
    "baseDex": 241,
    "name": "Miltank",
    "type": "single",
    "maxStage": 1,
    "maxBst": 490,
    "baseRarity": 3,
    "stages": [
      [
        241
      ],
      [],
      []
    ],
    "members": [
      241
    ]
  },
  "243": {
    "chainId": 123,
    "baseDex": 243,
    "name": "Raikou",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        243
      ],
      [],
      []
    ],
    "members": [
      243
    ]
  },
  "244": {
    "chainId": 124,
    "baseDex": 244,
    "name": "Entei",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        244
      ],
      [],
      []
    ],
    "members": [
      244
    ]
  },
  "245": {
    "chainId": 125,
    "baseDex": 245,
    "name": "Suicune",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        245
      ],
      [],
      []
    ],
    "members": [
      245
    ]
  },
  "246": {
    "chainId": 126,
    "baseDex": 246,
    "name": "Larvitar",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        246
      ],
      [
        247
      ],
      [
        248
      ]
    ],
    "members": [
      246,
      247,
      248
    ]
  },
  "249": {
    "chainId": 127,
    "baseDex": 249,
    "name": "Lugia",
    "type": "single",
    "maxStage": 1,
    "maxBst": 680,
    "baseRarity": 5,
    "stages": [
      [
        249
      ],
      [],
      []
    ],
    "members": [
      249
    ]
  },
  "250": {
    "chainId": 128,
    "baseDex": 250,
    "name": "Ho-Oh",
    "type": "single",
    "maxStage": 1,
    "maxBst": 680,
    "baseRarity": 5,
    "stages": [
      [
        250
      ],
      [],
      []
    ],
    "members": [
      250
    ]
  },
  "251": {
    "chainId": 129,
    "baseDex": 251,
    "name": "Celebi",
    "type": "single",
    "maxStage": 1,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        251
      ],
      [],
      []
    ],
    "members": [
      251
    ]
  },
  "252": {
    "chainId": 130,
    "baseDex": 252,
    "name": "Treecko",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        252
      ],
      [
        253
      ],
      [
        254
      ]
    ],
    "members": [
      252,
      253,
      254
    ]
  },
  "255": {
    "chainId": 131,
    "baseDex": 255,
    "name": "Torchic",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        255
      ],
      [
        256
      ],
      [
        257
      ]
    ],
    "members": [
      255,
      256,
      257
    ]
  },
  "258": {
    "chainId": 132,
    "baseDex": 258,
    "name": "Mudkip",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 535,
    "baseRarity": 4,
    "stages": [
      [
        258
      ],
      [
        259
      ],
      [
        260
      ]
    ],
    "members": [
      258,
      259,
      260
    ]
  },
  "261": {
    "chainId": 133,
    "baseDex": 261,
    "name": "Poochyena",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 420,
    "baseRarity": 3,
    "stages": [
      [
        261
      ],
      [
        262
      ],
      []
    ],
    "members": [
      261,
      262
    ]
  },
  "263": {
    "chainId": 134,
    "baseDex": 263,
    "name": "Zigzagoon",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 520,
    "baseRarity": 4,
    "stages": [
      [
        263
      ],
      [
        264
      ],
      [
        862
      ]
    ],
    "members": [
      263,
      264,
      862
    ]
  },
  "265": {
    "chainId": 135,
    "baseDex": 265,
    "name": "Wurmple",
    "type": "branch",
    "maxStage": 3,
    "maxBst": 395,
    "baseRarity": 2,
    "stages": [
      [
        265
      ],
      [
        266,
        268
      ],
      [
        267,
        269
      ]
    ],
    "members": [
      265,
      266,
      268,
      267,
      269
    ]
  },
  "270": {
    "chainId": 136,
    "baseDex": 270,
    "name": "Lotad",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 480,
    "baseRarity": 3,
    "stages": [
      [
        270
      ],
      [
        271
      ],
      [
        272
      ]
    ],
    "members": [
      270,
      271,
      272
    ]
  },
  "273": {
    "chainId": 137,
    "baseDex": 273,
    "name": "Seedot",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 480,
    "baseRarity": 3,
    "stages": [
      [
        273
      ],
      [
        274
      ],
      [
        275
      ]
    ],
    "members": [
      273,
      274,
      275
    ]
  },
  "276": {
    "chainId": 138,
    "baseDex": 276,
    "name": "Taillow",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 455,
    "baseRarity": 3,
    "stages": [
      [
        276
      ],
      [
        277
      ],
      []
    ],
    "members": [
      276,
      277
    ]
  },
  "278": {
    "chainId": 139,
    "baseDex": 278,
    "name": "Wingull",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 440,
    "baseRarity": 3,
    "stages": [
      [
        278
      ],
      [
        279
      ],
      []
    ],
    "members": [
      278,
      279
    ]
  },
  "280": {
    "chainId": 140,
    "baseDex": 280,
    "name": "Ralts",
    "type": "branch",
    "maxStage": 3,
    "maxBst": 518,
    "baseRarity": 4,
    "stages": [
      [
        280
      ],
      [
        281
      ],
      [
        282,
        475
      ]
    ],
    "members": [
      280,
      281,
      282,
      475
    ]
  },
  "283": {
    "chainId": 141,
    "baseDex": 283,
    "name": "Surskit",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 454,
    "baseRarity": 3,
    "stages": [
      [
        283
      ],
      [
        284
      ],
      []
    ],
    "members": [
      283,
      284
    ]
  },
  "285": {
    "chainId": 142,
    "baseDex": 285,
    "name": "Shroomish",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 460,
    "baseRarity": 3,
    "stages": [
      [
        285
      ],
      [
        286
      ],
      []
    ],
    "members": [
      285,
      286
    ]
  },
  "287": {
    "chainId": 143,
    "baseDex": 287,
    "name": "Slakoth",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 670,
    "baseRarity": 5,
    "stages": [
      [
        287
      ],
      [
        288
      ],
      [
        289
      ]
    ],
    "members": [
      287,
      288,
      289
    ]
  },
  "290": {
    "chainId": 144,
    "baseDex": 290,
    "name": "Nincada",
    "type": "branch",
    "maxStage": 2,
    "maxBst": 456,
    "baseRarity": 3,
    "stages": [
      [
        290
      ],
      [
        291,
        292
      ],
      []
    ],
    "members": [
      290,
      291,
      292
    ]
  },
  "293": {
    "chainId": 145,
    "baseDex": 293,
    "name": "Whismur",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 490,
    "baseRarity": 3,
    "stages": [
      [
        293
      ],
      [
        294
      ],
      [
        295
      ]
    ],
    "members": [
      293,
      294,
      295
    ]
  },
  "296": {
    "chainId": 146,
    "baseDex": 296,
    "name": "Makuhita",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 474,
    "baseRarity": 3,
    "stages": [
      [
        296
      ],
      [
        297
      ],
      []
    ],
    "members": [
      296,
      297
    ]
  },
  "299": {
    "chainId": 147,
    "baseDex": 299,
    "name": "Nosepass",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 525,
    "baseRarity": 4,
    "stages": [
      [
        299
      ],
      [
        476
      ],
      []
    ],
    "members": [
      299,
      476
    ]
  },
  "300": {
    "chainId": 148,
    "baseDex": 300,
    "name": "Skitty",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 400,
    "baseRarity": 2,
    "stages": [
      [
        300
      ],
      [
        301
      ],
      []
    ],
    "members": [
      300,
      301
    ]
  },
  "302": {
    "chainId": 149,
    "baseDex": 302,
    "name": "Sableye",
    "type": "single",
    "maxStage": 1,
    "maxBst": 380,
    "baseRarity": 2,
    "stages": [
      [
        302
      ],
      [],
      []
    ],
    "members": [
      302
    ]
  },
  "303": {
    "chainId": 150,
    "baseDex": 303,
    "name": "Mawile",
    "type": "single",
    "maxStage": 1,
    "maxBst": 380,
    "baseRarity": 2,
    "stages": [
      [
        303
      ],
      [],
      []
    ],
    "members": [
      303
    ]
  },
  "304": {
    "chainId": 151,
    "baseDex": 304,
    "name": "Aron",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        304
      ],
      [
        305
      ],
      [
        306
      ]
    ],
    "members": [
      304,
      305,
      306
    ]
  },
  "307": {
    "chainId": 152,
    "baseDex": 307,
    "name": "Meditite",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 410,
    "baseRarity": 3,
    "stages": [
      [
        307
      ],
      [
        308
      ],
      []
    ],
    "members": [
      307,
      308
    ]
  },
  "309": {
    "chainId": 153,
    "baseDex": 309,
    "name": "Electrike",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 475,
    "baseRarity": 3,
    "stages": [
      [
        309
      ],
      [
        310
      ],
      []
    ],
    "members": [
      309,
      310
    ]
  },
  "311": {
    "chainId": 154,
    "baseDex": 311,
    "name": "Plusle",
    "type": "single",
    "maxStage": 1,
    "maxBst": 405,
    "baseRarity": 2,
    "stages": [
      [
        311
      ],
      [],
      []
    ],
    "members": [
      311
    ]
  },
  "312": {
    "chainId": 155,
    "baseDex": 312,
    "name": "Minun",
    "type": "single",
    "maxStage": 1,
    "maxBst": 405,
    "baseRarity": 2,
    "stages": [
      [
        312
      ],
      [],
      []
    ],
    "members": [
      312
    ]
  },
  "313": {
    "chainId": 156,
    "baseDex": 313,
    "name": "Volbeat",
    "type": "single",
    "maxStage": 1,
    "maxBst": 430,
    "baseRarity": 3,
    "stages": [
      [
        313
      ],
      [],
      []
    ],
    "members": [
      313
    ]
  },
  "314": {
    "chainId": 157,
    "baseDex": 314,
    "name": "Illumise",
    "type": "single",
    "maxStage": 1,
    "maxBst": 430,
    "baseRarity": 3,
    "stages": [
      [
        314
      ],
      [],
      []
    ],
    "members": [
      314
    ]
  },
  "406": {
    "chainId": 158,
    "baseDex": 406,
    "name": "Budew",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 515,
    "baseRarity": 4,
    "stages": [
      [
        406
      ],
      [
        315
      ],
      [
        407
      ]
    ],
    "members": [
      406,
      315,
      407
    ]
  },
  "316": {
    "chainId": 159,
    "baseDex": 316,
    "name": "Gulpin",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 467,
    "baseRarity": 3,
    "stages": [
      [
        316
      ],
      [
        317
      ],
      []
    ],
    "members": [
      316,
      317
    ]
  },
  "318": {
    "chainId": 160,
    "baseDex": 318,
    "name": "Carvanha",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 460,
    "baseRarity": 3,
    "stages": [
      [
        318
      ],
      [
        319
      ],
      []
    ],
    "members": [
      318,
      319
    ]
  },
  "320": {
    "chainId": 161,
    "baseDex": 320,
    "name": "Wailmer",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        320
      ],
      [
        321
      ],
      []
    ],
    "members": [
      320,
      321
    ]
  },
  "322": {
    "chainId": 162,
    "baseDex": 322,
    "name": "Numel",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 460,
    "baseRarity": 3,
    "stages": [
      [
        322
      ],
      [
        323
      ],
      []
    ],
    "members": [
      322,
      323
    ]
  },
  "324": {
    "chainId": 163,
    "baseDex": 324,
    "name": "Torkoal",
    "type": "single",
    "maxStage": 1,
    "maxBst": 470,
    "baseRarity": 3,
    "stages": [
      [
        324
      ],
      [],
      []
    ],
    "members": [
      324
    ]
  },
  "325": {
    "chainId": 164,
    "baseDex": 325,
    "name": "Spoink",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 470,
    "baseRarity": 3,
    "stages": [
      [
        325
      ],
      [
        326
      ],
      []
    ],
    "members": [
      325,
      326
    ]
  },
  "327": {
    "chainId": 165,
    "baseDex": 327,
    "name": "Spinda",
    "type": "single",
    "maxStage": 1,
    "maxBst": 360,
    "baseRarity": 2,
    "stages": [
      [
        327
      ],
      [],
      []
    ],
    "members": [
      327
    ]
  },
  "328": {
    "chainId": 166,
    "baseDex": 328,
    "name": "Trapinch",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 520,
    "baseRarity": 4,
    "stages": [
      [
        328
      ],
      [
        329
      ],
      [
        330
      ]
    ],
    "members": [
      328,
      329,
      330
    ]
  },
  "331": {
    "chainId": 167,
    "baseDex": 331,
    "name": "Cacnea",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 475,
    "baseRarity": 3,
    "stages": [
      [
        331
      ],
      [
        332
      ],
      []
    ],
    "members": [
      331,
      332
    ]
  },
  "333": {
    "chainId": 168,
    "baseDex": 333,
    "name": "Swablu",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 490,
    "baseRarity": 3,
    "stages": [
      [
        333
      ],
      [
        334
      ],
      []
    ],
    "members": [
      333,
      334
    ]
  },
  "335": {
    "chainId": 169,
    "baseDex": 335,
    "name": "Zangoose",
    "type": "single",
    "maxStage": 1,
    "maxBst": 458,
    "baseRarity": 3,
    "stages": [
      [
        335
      ],
      [],
      []
    ],
    "members": [
      335
    ]
  },
  "336": {
    "chainId": 170,
    "baseDex": 336,
    "name": "Seviper",
    "type": "single",
    "maxStage": 1,
    "maxBst": 458,
    "baseRarity": 3,
    "stages": [
      [
        336
      ],
      [],
      []
    ],
    "members": [
      336
    ]
  },
  "337": {
    "chainId": 171,
    "baseDex": 337,
    "name": "Lunatone",
    "type": "single",
    "maxStage": 1,
    "maxBst": 460,
    "baseRarity": 3,
    "stages": [
      [
        337
      ],
      [],
      []
    ],
    "members": [
      337
    ]
  },
  "338": {
    "chainId": 172,
    "baseDex": 338,
    "name": "Solrock",
    "type": "single",
    "maxStage": 1,
    "maxBst": 460,
    "baseRarity": 3,
    "stages": [
      [
        338
      ],
      [],
      []
    ],
    "members": [
      338
    ]
  },
  "339": {
    "chainId": 173,
    "baseDex": 339,
    "name": "Barboach",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 468,
    "baseRarity": 3,
    "stages": [
      [
        339
      ],
      [
        340
      ],
      []
    ],
    "members": [
      339,
      340
    ]
  },
  "341": {
    "chainId": 174,
    "baseDex": 341,
    "name": "Corphish",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 468,
    "baseRarity": 3,
    "stages": [
      [
        341
      ],
      [
        342
      ],
      []
    ],
    "members": [
      341,
      342
    ]
  },
  "343": {
    "chainId": 175,
    "baseDex": 343,
    "name": "Baltoy",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        343
      ],
      [
        344
      ],
      []
    ],
    "members": [
      343,
      344
    ]
  },
  "345": {
    "chainId": 176,
    "baseDex": 345,
    "name": "Lileep",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 495,
    "baseRarity": 4,
    "stages": [
      [
        345
      ],
      [
        346
      ],
      []
    ],
    "members": [
      345,
      346
    ]
  },
  "347": {
    "chainId": 177,
    "baseDex": 347,
    "name": "Anorith",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 495,
    "baseRarity": 4,
    "stages": [
      [
        347
      ],
      [
        348
      ],
      []
    ],
    "members": [
      347,
      348
    ]
  },
  "349": {
    "chainId": 178,
    "baseDex": 349,
    "name": "Feebas",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 540,
    "baseRarity": 4,
    "stages": [
      [
        349
      ],
      [
        350
      ],
      []
    ],
    "members": [
      349,
      350
    ]
  },
  "351": {
    "chainId": 179,
    "baseDex": 351,
    "name": "Castform",
    "type": "single",
    "maxStage": 1,
    "maxBst": 420,
    "baseRarity": 3,
    "stages": [
      [
        351
      ],
      [],
      []
    ],
    "members": [
      351
    ]
  },
  "352": {
    "chainId": 180,
    "baseDex": 352,
    "name": "Kecleon",
    "type": "single",
    "maxStage": 1,
    "maxBst": 440,
    "baseRarity": 3,
    "stages": [
      [
        352
      ],
      [],
      []
    ],
    "members": [
      352
    ]
  },
  "353": {
    "chainId": 181,
    "baseDex": 353,
    "name": "Shuppet",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 455,
    "baseRarity": 3,
    "stages": [
      [
        353
      ],
      [
        354
      ],
      []
    ],
    "members": [
      353,
      354
    ]
  },
  "355": {
    "chainId": 182,
    "baseDex": 355,
    "name": "Duskull",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 525,
    "baseRarity": 4,
    "stages": [
      [
        355
      ],
      [
        356
      ],
      [
        477
      ]
    ],
    "members": [
      355,
      356,
      477
    ]
  },
  "357": {
    "chainId": 183,
    "baseDex": 357,
    "name": "Tropius",
    "type": "single",
    "maxStage": 1,
    "maxBst": 460,
    "baseRarity": 3,
    "stages": [
      [
        357
      ],
      [],
      []
    ],
    "members": [
      357
    ]
  },
  "433": {
    "chainId": 184,
    "baseDex": 433,
    "name": "Chingling",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 455,
    "baseRarity": 3,
    "stages": [
      [
        433
      ],
      [
        358
      ],
      []
    ],
    "members": [
      433,
      358
    ]
  },
  "359": {
    "chainId": 185,
    "baseDex": 359,
    "name": "Absol",
    "type": "single",
    "maxStage": 1,
    "maxBst": 465,
    "baseRarity": 3,
    "stages": [
      [
        359
      ],
      [],
      []
    ],
    "members": [
      359
    ]
  },
  "361": {
    "chainId": 186,
    "baseDex": 361,
    "name": "Snorunt",
    "type": "branch",
    "maxStage": 2,
    "maxBst": 480,
    "baseRarity": 3,
    "stages": [
      [
        361
      ],
      [
        362,
        478
      ],
      []
    ],
    "members": [
      361,
      362,
      478
    ]
  },
  "363": {
    "chainId": 187,
    "baseDex": 363,
    "name": "Spheal",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        363
      ],
      [
        364
      ],
      [
        365
      ]
    ],
    "members": [
      363,
      364,
      365
    ]
  },
  "366": {
    "chainId": 188,
    "baseDex": 366,
    "name": "Clamperl",
    "type": "branch",
    "maxStage": 2,
    "maxBst": 485,
    "baseRarity": 3,
    "stages": [
      [
        366
      ],
      [
        367,
        368
      ],
      []
    ],
    "members": [
      366,
      367,
      368
    ]
  },
  "369": {
    "chainId": 189,
    "baseDex": 369,
    "name": "Relicanth",
    "type": "single",
    "maxStage": 1,
    "maxBst": 485,
    "baseRarity": 3,
    "stages": [
      [
        369
      ],
      [],
      []
    ],
    "members": [
      369
    ]
  },
  "370": {
    "chainId": 190,
    "baseDex": 370,
    "name": "Luvdisc",
    "type": "single",
    "maxStage": 1,
    "maxBst": 330,
    "baseRarity": 2,
    "stages": [
      [
        370
      ],
      [],
      []
    ],
    "members": [
      370
    ]
  },
  "371": {
    "chainId": 191,
    "baseDex": 371,
    "name": "Bagon",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        371
      ],
      [
        372
      ],
      [
        373
      ]
    ],
    "members": [
      371,
      372,
      373
    ]
  },
  "374": {
    "chainId": 192,
    "baseDex": 374,
    "name": "Beldum",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        374
      ],
      [
        375
      ],
      [
        376
      ]
    ],
    "members": [
      374,
      375,
      376
    ]
  },
  "377": {
    "chainId": 193,
    "baseDex": 377,
    "name": "Regirock",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        377
      ],
      [],
      []
    ],
    "members": [
      377
    ]
  },
  "378": {
    "chainId": 194,
    "baseDex": 378,
    "name": "Regice",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        378
      ],
      [],
      []
    ],
    "members": [
      378
    ]
  },
  "379": {
    "chainId": 195,
    "baseDex": 379,
    "name": "Registeel",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        379
      ],
      [],
      []
    ],
    "members": [
      379
    ]
  },
  "380": {
    "chainId": 196,
    "baseDex": 380,
    "name": "Latias",
    "type": "single",
    "maxStage": 1,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        380
      ],
      [],
      []
    ],
    "members": [
      380
    ]
  },
  "381": {
    "chainId": 197,
    "baseDex": 381,
    "name": "Latios",
    "type": "single",
    "maxStage": 1,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        381
      ],
      [],
      []
    ],
    "members": [
      381
    ]
  },
  "382": {
    "chainId": 198,
    "baseDex": 382,
    "name": "Kyogre",
    "type": "single",
    "maxStage": 1,
    "maxBst": 670,
    "baseRarity": 5,
    "stages": [
      [
        382
      ],
      [],
      []
    ],
    "members": [
      382
    ]
  },
  "383": {
    "chainId": 199,
    "baseDex": 383,
    "name": "Groudon",
    "type": "single",
    "maxStage": 1,
    "maxBst": 670,
    "baseRarity": 5,
    "stages": [
      [
        383
      ],
      [],
      []
    ],
    "members": [
      383
    ]
  },
  "384": {
    "chainId": 200,
    "baseDex": 384,
    "name": "Rayquaza",
    "type": "single",
    "maxStage": 1,
    "maxBst": 680,
    "baseRarity": 5,
    "stages": [
      [
        384
      ],
      [],
      []
    ],
    "members": [
      384
    ]
  },
  "385": {
    "chainId": 201,
    "baseDex": 385,
    "name": "Jirachi",
    "type": "single",
    "maxStage": 1,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        385
      ],
      [],
      []
    ],
    "members": [
      385
    ]
  },
  "386": {
    "chainId": 202,
    "baseDex": 386,
    "name": "Deoxys",
    "type": "single",
    "maxStage": 1,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        386
      ],
      [],
      []
    ],
    "members": [
      386
    ]
  },
  "387": {
    "chainId": 203,
    "baseDex": 387,
    "name": "Turtwig",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 525,
    "baseRarity": 4,
    "stages": [
      [
        387
      ],
      [
        388
      ],
      [
        389
      ]
    ],
    "members": [
      387,
      388,
      389
    ]
  },
  "390": {
    "chainId": 204,
    "baseDex": 390,
    "name": "Chimchar",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 534,
    "baseRarity": 4,
    "stages": [
      [
        390
      ],
      [
        391
      ],
      [
        392
      ]
    ],
    "members": [
      390,
      391,
      392
    ]
  },
  "393": {
    "chainId": 205,
    "baseDex": 393,
    "name": "Piplup",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        393
      ],
      [
        394
      ],
      [
        395
      ]
    ],
    "members": [
      393,
      394,
      395
    ]
  },
  "396": {
    "chainId": 206,
    "baseDex": 396,
    "name": "Starly",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 485,
    "baseRarity": 3,
    "stages": [
      [
        396
      ],
      [
        397
      ],
      [
        398
      ]
    ],
    "members": [
      396,
      397,
      398
    ]
  },
  "399": {
    "chainId": 207,
    "baseDex": 399,
    "name": "Bidoof",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 410,
    "baseRarity": 3,
    "stages": [
      [
        399
      ],
      [
        400
      ],
      []
    ],
    "members": [
      399,
      400
    ]
  },
  "401": {
    "chainId": 208,
    "baseDex": 401,
    "name": "Kricketot",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 384,
    "baseRarity": 2,
    "stages": [
      [
        401
      ],
      [
        402
      ],
      []
    ],
    "members": [
      401,
      402
    ]
  },
  "403": {
    "chainId": 209,
    "baseDex": 403,
    "name": "Shinx",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 523,
    "baseRarity": 4,
    "stages": [
      [
        403
      ],
      [
        404
      ],
      [
        405
      ]
    ],
    "members": [
      403,
      404,
      405
    ]
  },
  "408": {
    "chainId": 211,
    "baseDex": 408,
    "name": "Cranidos",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 495,
    "baseRarity": 4,
    "stages": [
      [
        408
      ],
      [
        409
      ],
      []
    ],
    "members": [
      408,
      409
    ]
  },
  "410": {
    "chainId": 212,
    "baseDex": 410,
    "name": "Shieldon",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 495,
    "baseRarity": 4,
    "stages": [
      [
        410
      ],
      [
        411
      ],
      []
    ],
    "members": [
      410,
      411
    ]
  },
  "412": {
    "chainId": 213,
    "baseDex": 412,
    "name": "Burmy",
    "type": "branch",
    "maxStage": 2,
    "maxBst": 424,
    "baseRarity": 3,
    "stages": [
      [
        412
      ],
      [
        413,
        414
      ],
      []
    ],
    "members": [
      412,
      413,
      414
    ]
  },
  "415": {
    "chainId": 214,
    "baseDex": 415,
    "name": "Combee",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 474,
    "baseRarity": 3,
    "stages": [
      [
        415
      ],
      [
        416
      ],
      []
    ],
    "members": [
      415,
      416
    ]
  },
  "417": {
    "chainId": 215,
    "baseDex": 417,
    "name": "Pachirisu",
    "type": "single",
    "maxStage": 1,
    "maxBst": 405,
    "baseRarity": 2,
    "stages": [
      [
        417
      ],
      [],
      []
    ],
    "members": [
      417
    ]
  },
  "418": {
    "chainId": 216,
    "baseDex": 418,
    "name": "Buizel",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 495,
    "baseRarity": 4,
    "stages": [
      [
        418
      ],
      [
        419
      ],
      []
    ],
    "members": [
      418,
      419
    ]
  },
  "420": {
    "chainId": 217,
    "baseDex": 420,
    "name": "Cherubi",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 450,
    "baseRarity": 3,
    "stages": [
      [
        420
      ],
      [
        421
      ],
      []
    ],
    "members": [
      420,
      421
    ]
  },
  "422": {
    "chainId": 218,
    "baseDex": 422,
    "name": "Shellos",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 475,
    "baseRarity": 3,
    "stages": [
      [
        422
      ],
      [
        423
      ],
      []
    ],
    "members": [
      422,
      423
    ]
  },
  "425": {
    "chainId": 219,
    "baseDex": 425,
    "name": "Drifloon",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 498,
    "baseRarity": 4,
    "stages": [
      [
        425
      ],
      [
        426
      ],
      []
    ],
    "members": [
      425,
      426
    ]
  },
  "427": {
    "chainId": 220,
    "baseDex": 427,
    "name": "Buneary",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 480,
    "baseRarity": 3,
    "stages": [
      [
        427
      ],
      [
        428
      ],
      []
    ],
    "members": [
      427,
      428
    ]
  },
  "431": {
    "chainId": 221,
    "baseDex": 431,
    "name": "Glameow",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 452,
    "baseRarity": 3,
    "stages": [
      [
        431
      ],
      [
        432
      ],
      []
    ],
    "members": [
      431,
      432
    ]
  },
  "434": {
    "chainId": 223,
    "baseDex": 434,
    "name": "Stunky",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 479,
    "baseRarity": 3,
    "stages": [
      [
        434
      ],
      [
        435
      ],
      []
    ],
    "members": [
      434,
      435
    ]
  },
  "436": {
    "chainId": 224,
    "baseDex": 436,
    "name": "Bronzor",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        436
      ],
      [
        437
      ],
      []
    ],
    "members": [
      436,
      437
    ]
  },
  "441": {
    "chainId": 228,
    "baseDex": 441,
    "name": "Chatot",
    "type": "single",
    "maxStage": 1,
    "maxBst": 411,
    "baseRarity": 3,
    "stages": [
      [
        441
      ],
      [],
      []
    ],
    "members": [
      441
    ]
  },
  "442": {
    "chainId": 229,
    "baseDex": 442,
    "name": "Spiritomb",
    "type": "single",
    "maxStage": 1,
    "maxBst": 485,
    "baseRarity": 3,
    "stages": [
      [
        442
      ],
      [],
      []
    ],
    "members": [
      442
    ]
  },
  "443": {
    "chainId": 230,
    "baseDex": 443,
    "name": "Gible",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        443
      ],
      [
        444
      ],
      [
        445
      ]
    ],
    "members": [
      443,
      444,
      445
    ]
  },
  "447": {
    "chainId": 232,
    "baseDex": 447,
    "name": "Riolu",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 525,
    "baseRarity": 4,
    "stages": [
      [
        447
      ],
      [
        448
      ],
      []
    ],
    "members": [
      447,
      448
    ]
  },
  "449": {
    "chainId": 233,
    "baseDex": 449,
    "name": "Hippopotas",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 525,
    "baseRarity": 4,
    "stages": [
      [
        449
      ],
      [
        450
      ],
      []
    ],
    "members": [
      449,
      450
    ]
  },
  "451": {
    "chainId": 234,
    "baseDex": 451,
    "name": "Skorupi",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        451
      ],
      [
        452
      ],
      []
    ],
    "members": [
      451,
      452
    ]
  },
  "453": {
    "chainId": 235,
    "baseDex": 453,
    "name": "Croagunk",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 490,
    "baseRarity": 3,
    "stages": [
      [
        453
      ],
      [
        454
      ],
      []
    ],
    "members": [
      453,
      454
    ]
  },
  "455": {
    "chainId": 236,
    "baseDex": 455,
    "name": "Carnivine",
    "type": "single",
    "maxStage": 1,
    "maxBst": 454,
    "baseRarity": 3,
    "stages": [
      [
        455
      ],
      [],
      []
    ],
    "members": [
      455
    ]
  },
  "456": {
    "chainId": 237,
    "baseDex": 456,
    "name": "Finneon",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 460,
    "baseRarity": 3,
    "stages": [
      [
        456
      ],
      [
        457
      ],
      []
    ],
    "members": [
      456,
      457
    ]
  },
  "459": {
    "chainId": 239,
    "baseDex": 459,
    "name": "Snover",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 494,
    "baseRarity": 3,
    "stages": [
      [
        459
      ],
      [
        460
      ],
      []
    ],
    "members": [
      459,
      460
    ]
  },
  "479": {
    "chainId": 240,
    "baseDex": 479,
    "name": "Rotom",
    "type": "single",
    "maxStage": 1,
    "maxBst": 440,
    "baseRarity": 3,
    "stages": [
      [
        479
      ],
      [],
      []
    ],
    "members": [
      479
    ]
  },
  "480": {
    "chainId": 241,
    "baseDex": 480,
    "name": "Uxie",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        480
      ],
      [],
      []
    ],
    "members": [
      480
    ]
  },
  "481": {
    "chainId": 242,
    "baseDex": 481,
    "name": "Mesprit",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        481
      ],
      [],
      []
    ],
    "members": [
      481
    ]
  },
  "482": {
    "chainId": 243,
    "baseDex": 482,
    "name": "Azelf",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        482
      ],
      [],
      []
    ],
    "members": [
      482
    ]
  },
  "483": {
    "chainId": 244,
    "baseDex": 483,
    "name": "Dialga",
    "type": "single",
    "maxStage": 1,
    "maxBst": 680,
    "baseRarity": 5,
    "stages": [
      [
        483
      ],
      [],
      []
    ],
    "members": [
      483
    ]
  },
  "484": {
    "chainId": 245,
    "baseDex": 484,
    "name": "Palkia",
    "type": "single",
    "maxStage": 1,
    "maxBst": 680,
    "baseRarity": 5,
    "stages": [
      [
        484
      ],
      [],
      []
    ],
    "members": [
      484
    ]
  },
  "485": {
    "chainId": 246,
    "baseDex": 485,
    "name": "Heatran",
    "type": "single",
    "maxStage": 1,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        485
      ],
      [],
      []
    ],
    "members": [
      485
    ]
  },
  "486": {
    "chainId": 247,
    "baseDex": 486,
    "name": "Regigigas",
    "type": "single",
    "maxStage": 1,
    "maxBst": 670,
    "baseRarity": 5,
    "stages": [
      [
        486
      ],
      [],
      []
    ],
    "members": [
      486
    ]
  },
  "487": {
    "chainId": 248,
    "baseDex": 487,
    "name": "Giratina",
    "type": "single",
    "maxStage": 1,
    "maxBst": 680,
    "baseRarity": 5,
    "stages": [
      [
        487
      ],
      [],
      []
    ],
    "members": [
      487
    ]
  },
  "488": {
    "chainId": 249,
    "baseDex": 488,
    "name": "Cresselia",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        488
      ],
      [],
      []
    ],
    "members": [
      488
    ]
  },
  "489": {
    "chainId": 250,
    "baseDex": 489,
    "name": "Phione",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        489
      ],
      [
        490
      ],
      []
    ],
    "members": [
      489,
      490
    ]
  },
  "491": {
    "chainId": 252,
    "baseDex": 491,
    "name": "Darkrai",
    "type": "single",
    "maxStage": 1,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        491
      ],
      [],
      []
    ],
    "members": [
      491
    ]
  },
  "492": {
    "chainId": 253,
    "baseDex": 492,
    "name": "Shaymin",
    "type": "single",
    "maxStage": 1,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        492
      ],
      [],
      []
    ],
    "members": [
      492
    ]
  },
  "493": {
    "chainId": 254,
    "baseDex": 493,
    "name": "Arceus",
    "type": "single",
    "maxStage": 1,
    "maxBst": 720,
    "baseRarity": 5,
    "stages": [
      [
        493
      ],
      [],
      []
    ],
    "members": [
      493
    ]
  },
  "494": {
    "chainId": 255,
    "baseDex": 494,
    "name": "Victini",
    "type": "single",
    "maxStage": 1,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        494
      ],
      [],
      []
    ],
    "members": [
      494
    ]
  },
  "495": {
    "chainId": 256,
    "baseDex": 495,
    "name": "Snivy",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 528,
    "baseRarity": 4,
    "stages": [
      [
        495
      ],
      [
        496
      ],
      [
        497
      ]
    ],
    "members": [
      495,
      496,
      497
    ]
  },
  "498": {
    "chainId": 257,
    "baseDex": 498,
    "name": "Tepig",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 528,
    "baseRarity": 4,
    "stages": [
      [
        498
      ],
      [
        499
      ],
      [
        500
      ]
    ],
    "members": [
      498,
      499,
      500
    ]
  },
  "501": {
    "chainId": 258,
    "baseDex": 501,
    "name": "Oshawott",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 528,
    "baseRarity": 4,
    "stages": [
      [
        501
      ],
      [
        502
      ],
      [
        503
      ]
    ],
    "members": [
      501,
      502,
      503
    ]
  },
  "504": {
    "chainId": 259,
    "baseDex": 504,
    "name": "Patrat",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 420,
    "baseRarity": 3,
    "stages": [
      [
        504
      ],
      [
        505
      ],
      []
    ],
    "members": [
      504,
      505
    ]
  },
  "506": {
    "chainId": 260,
    "baseDex": 506,
    "name": "Lillipup",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        506
      ],
      [
        507
      ],
      [
        508
      ]
    ],
    "members": [
      506,
      507,
      508
    ]
  },
  "509": {
    "chainId": 261,
    "baseDex": 509,
    "name": "Purrloin",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 446,
    "baseRarity": 3,
    "stages": [
      [
        509
      ],
      [
        510
      ],
      []
    ],
    "members": [
      509,
      510
    ]
  },
  "511": {
    "chainId": 262,
    "baseDex": 511,
    "name": "Pansage",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 498,
    "baseRarity": 4,
    "stages": [
      [
        511
      ],
      [
        512
      ],
      []
    ],
    "members": [
      511,
      512
    ]
  },
  "513": {
    "chainId": 263,
    "baseDex": 513,
    "name": "Pansear",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 316,
    "baseRarity": 1,
    "stages": [
      [
        513
      ],
      [
        514
      ],
      []
    ],
    "members": [
      513,
      514
    ]
  },
  "515": {
    "chainId": 264,
    "baseDex": 515,
    "name": "Panpour",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 316,
    "baseRarity": 1,
    "stages": [
      [
        515
      ],
      [
        516
      ],
      []
    ],
    "members": [
      515,
      516
    ]
  },
  "517": {
    "chainId": 265,
    "baseDex": 517,
    "name": "Munna",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 487,
    "baseRarity": 3,
    "stages": [
      [
        517
      ],
      [
        518
      ],
      []
    ],
    "members": [
      517,
      518
    ]
  },
  "519": {
    "chainId": 266,
    "baseDex": 519,
    "name": "Pidove",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 488,
    "baseRarity": 3,
    "stages": [
      [
        519
      ],
      [
        520
      ],
      [
        521
      ]
    ],
    "members": [
      519,
      520,
      521
    ]
  },
  "524": {
    "chainId": 268,
    "baseDex": 524,
    "name": "Roggenrola",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 515,
    "baseRarity": 4,
    "stages": [
      [
        524
      ],
      [
        525
      ],
      [
        526
      ]
    ],
    "members": [
      524,
      525,
      526
    ]
  },
  "527": {
    "chainId": 269,
    "baseDex": 527,
    "name": "Woobat",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 425,
    "baseRarity": 3,
    "stages": [
      [
        527
      ],
      [
        528
      ],
      []
    ],
    "members": [
      527,
      528
    ]
  },
  "529": {
    "chainId": 270,
    "baseDex": 529,
    "name": "Drilbur",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 508,
    "baseRarity": 4,
    "stages": [
      [
        529
      ],
      [
        530
      ],
      []
    ],
    "members": [
      529,
      530
    ]
  },
  "531": {
    "chainId": 271,
    "baseDex": 531,
    "name": "Audino",
    "type": "single",
    "maxStage": 1,
    "maxBst": 445,
    "baseRarity": 3,
    "stages": [
      [
        531
      ],
      [],
      []
    ],
    "members": [
      531
    ]
  },
  "532": {
    "chainId": 272,
    "baseDex": 532,
    "name": "Timburr",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 505,
    "baseRarity": 4,
    "stages": [
      [
        532
      ],
      [
        533
      ],
      [
        534
      ]
    ],
    "members": [
      532,
      533,
      534
    ]
  },
  "535": {
    "chainId": 273,
    "baseDex": 535,
    "name": "Tympole",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 509,
    "baseRarity": 4,
    "stages": [
      [
        535
      ],
      [
        536
      ],
      [
        537
      ]
    ],
    "members": [
      535,
      536,
      537
    ]
  },
  "539": {
    "chainId": 275,
    "baseDex": 539,
    "name": "Sawk",
    "type": "single",
    "maxStage": 1,
    "maxBst": 465,
    "baseRarity": 3,
    "stages": [
      [
        539
      ],
      [],
      []
    ],
    "members": [
      539
    ]
  },
  "540": {
    "chainId": 276,
    "baseDex": 540,
    "name": "Sewaddle",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        540
      ],
      [
        541
      ],
      [
        542
      ]
    ],
    "members": [
      540,
      541,
      542
    ]
  },
  "543": {
    "chainId": 277,
    "baseDex": 543,
    "name": "Venipede",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 485,
    "baseRarity": 3,
    "stages": [
      [
        543
      ],
      [
        544
      ],
      [
        545
      ]
    ],
    "members": [
      543,
      544,
      545
    ]
  },
  "546": {
    "chainId": 278,
    "baseDex": 546,
    "name": "Cottonee",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 480,
    "baseRarity": 3,
    "stages": [
      [
        546
      ],
      [
        547
      ],
      []
    ],
    "members": [
      546,
      547
    ]
  },
  "548": {
    "chainId": 279,
    "baseDex": 548,
    "name": "Petilil",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 480,
    "baseRarity": 3,
    "stages": [
      [
        548
      ],
      [
        549
      ],
      []
    ],
    "members": [
      548,
      549
    ]
  },
  "550": {
    "chainId": 280,
    "baseDex": 550,
    "name": "Basculin",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        550
      ],
      [
        902
      ],
      []
    ],
    "members": [
      550,
      902
    ]
  },
  "551": {
    "chainId": 281,
    "baseDex": 551,
    "name": "Sandile",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 519,
    "baseRarity": 4,
    "stages": [
      [
        551
      ],
      [
        552
      ],
      [
        553
      ]
    ],
    "members": [
      551,
      552,
      553
    ]
  },
  "554": {
    "chainId": 282,
    "baseDex": 554,
    "name": "Darumaka",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 480,
    "baseRarity": 3,
    "stages": [
      [
        554
      ],
      [
        555
      ],
      []
    ],
    "members": [
      554,
      555
    ]
  },
  "556": {
    "chainId": 283,
    "baseDex": 556,
    "name": "Maractus",
    "type": "single",
    "maxStage": 1,
    "maxBst": 461,
    "baseRarity": 3,
    "stages": [
      [
        556
      ],
      [],
      []
    ],
    "members": [
      556
    ]
  },
  "557": {
    "chainId": 284,
    "baseDex": 557,
    "name": "Dwebble",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 325,
    "baseRarity": 2,
    "stages": [
      [
        557
      ],
      [
        558
      ],
      []
    ],
    "members": [
      557,
      558
    ]
  },
  "559": {
    "chainId": 285,
    "baseDex": 559,
    "name": "Scraggy",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 488,
    "baseRarity": 3,
    "stages": [
      [
        559
      ],
      [
        560
      ],
      []
    ],
    "members": [
      559,
      560
    ]
  },
  "561": {
    "chainId": 286,
    "baseDex": 561,
    "name": "Sigilyph",
    "type": "single",
    "maxStage": 1,
    "maxBst": 490,
    "baseRarity": 3,
    "stages": [
      [
        561
      ],
      [],
      []
    ],
    "members": [
      561
    ]
  },
  "562": {
    "chainId": 287,
    "baseDex": 562,
    "name": "Yamask",
    "type": "branch",
    "maxStage": 2,
    "maxBst": 483,
    "baseRarity": 3,
    "stages": [
      [
        562
      ],
      [
        563,
        867
      ],
      []
    ],
    "members": [
      562,
      563,
      867
    ]
  },
  "566": {
    "chainId": 289,
    "baseDex": 566,
    "name": "Archen",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 567,
    "baseRarity": 4,
    "stages": [
      [
        566
      ],
      [
        567
      ],
      []
    ],
    "members": [
      566,
      567
    ]
  },
  "568": {
    "chainId": 290,
    "baseDex": 568,
    "name": "Trubbish",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 474,
    "baseRarity": 3,
    "stages": [
      [
        568
      ],
      [
        569
      ],
      []
    ],
    "members": [
      568,
      569
    ]
  },
  "570": {
    "chainId": 291,
    "baseDex": 570,
    "name": "Zorua",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 510,
    "baseRarity": 4,
    "stages": [
      [
        570
      ],
      [
        571
      ],
      []
    ],
    "members": [
      570,
      571
    ]
  },
  "572": {
    "chainId": 292,
    "baseDex": 572,
    "name": "Minccino",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 470,
    "baseRarity": 3,
    "stages": [
      [
        572
      ],
      [
        573
      ],
      []
    ],
    "members": [
      572,
      573
    ]
  },
  "574": {
    "chainId": 293,
    "baseDex": 574,
    "name": "Gothita",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 490,
    "baseRarity": 3,
    "stages": [
      [
        574
      ],
      [
        575
      ],
      [
        576
      ]
    ],
    "members": [
      574,
      575,
      576
    ]
  },
  "577": {
    "chainId": 294,
    "baseDex": 577,
    "name": "Solosis",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 490,
    "baseRarity": 3,
    "stages": [
      [
        577
      ],
      [
        578
      ],
      [
        579
      ]
    ],
    "members": [
      577,
      578,
      579
    ]
  },
  "580": {
    "chainId": 295,
    "baseDex": 580,
    "name": "Ducklett",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 473,
    "baseRarity": 3,
    "stages": [
      [
        580
      ],
      [
        581
      ],
      []
    ],
    "members": [
      580,
      581
    ]
  },
  "582": {
    "chainId": 296,
    "baseDex": 582,
    "name": "Vanillite",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 535,
    "baseRarity": 4,
    "stages": [
      [
        582
      ],
      [
        583
      ],
      [
        584
      ]
    ],
    "members": [
      582,
      583,
      584
    ]
  },
  "585": {
    "chainId": 297,
    "baseDex": 585,
    "name": "Deerling",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 475,
    "baseRarity": 3,
    "stages": [
      [
        585
      ],
      [
        586
      ],
      []
    ],
    "members": [
      585,
      586
    ]
  },
  "587": {
    "chainId": 298,
    "baseDex": 587,
    "name": "Emolga",
    "type": "single",
    "maxStage": 1,
    "maxBst": 428,
    "baseRarity": 3,
    "stages": [
      [
        587
      ],
      [],
      []
    ],
    "members": [
      587
    ]
  },
  "588": {
    "chainId": 299,
    "baseDex": 588,
    "name": "Karrablast",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 495,
    "baseRarity": 4,
    "stages": [
      [
        588
      ],
      [
        589
      ],
      []
    ],
    "members": [
      588,
      589
    ]
  },
  "590": {
    "chainId": 300,
    "baseDex": 590,
    "name": "Foongus",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 294,
    "baseRarity": 1,
    "stages": [
      [
        590
      ],
      [
        591
      ],
      []
    ],
    "members": [
      590,
      591
    ]
  },
  "594": {
    "chainId": 302,
    "baseDex": 594,
    "name": "Alomomola",
    "type": "single",
    "maxStage": 1,
    "maxBst": 470,
    "baseRarity": 3,
    "stages": [
      [
        594
      ],
      [],
      []
    ],
    "members": [
      594
    ]
  },
  "595": {
    "chainId": 303,
    "baseDex": 595,
    "name": "Joltik",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 472,
    "baseRarity": 3,
    "stages": [
      [
        595
      ],
      [
        596
      ],
      []
    ],
    "members": [
      595,
      596
    ]
  },
  "597": {
    "chainId": 304,
    "baseDex": 597,
    "name": "Ferroseed",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 489,
    "baseRarity": 3,
    "stages": [
      [
        597
      ],
      [
        598
      ],
      []
    ],
    "members": [
      597,
      598
    ]
  },
  "599": {
    "chainId": 305,
    "baseDex": 599,
    "name": "Klink",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 520,
    "baseRarity": 4,
    "stages": [
      [
        599
      ],
      [
        600
      ],
      [
        601
      ]
    ],
    "members": [
      599,
      600,
      601
    ]
  },
  "602": {
    "chainId": 306,
    "baseDex": 602,
    "name": "Tynamo",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 515,
    "baseRarity": 4,
    "stages": [
      [
        602
      ],
      [
        603
      ],
      [
        604
      ]
    ],
    "members": [
      602,
      603,
      604
    ]
  },
  "605": {
    "chainId": 307,
    "baseDex": 605,
    "name": "Elgyem",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 485,
    "baseRarity": 3,
    "stages": [
      [
        605
      ],
      [
        606
      ],
      []
    ],
    "members": [
      605,
      606
    ]
  },
  "607": {
    "chainId": 308,
    "baseDex": 607,
    "name": "Litwick",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 520,
    "baseRarity": 4,
    "stages": [
      [
        607
      ],
      [
        608
      ],
      [
        609
      ]
    ],
    "members": [
      607,
      608,
      609
    ]
  },
  "610": {
    "chainId": 309,
    "baseDex": 610,
    "name": "Axew",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 540,
    "baseRarity": 4,
    "stages": [
      [
        610
      ],
      [
        611
      ],
      [
        612
      ]
    ],
    "members": [
      610,
      611,
      612
    ]
  },
  "613": {
    "chainId": 310,
    "baseDex": 613,
    "name": "Cubchoo",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 505,
    "baseRarity": 4,
    "stages": [
      [
        613
      ],
      [
        614
      ],
      []
    ],
    "members": [
      613,
      614
    ]
  },
  "615": {
    "chainId": 311,
    "baseDex": 615,
    "name": "Cryogonal",
    "type": "single",
    "maxStage": 1,
    "maxBst": 515,
    "baseRarity": 4,
    "stages": [
      [
        615
      ],
      [],
      []
    ],
    "members": [
      615
    ]
  },
  "616": {
    "chainId": 312,
    "baseDex": 616,
    "name": "Shelmet",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 495,
    "baseRarity": 4,
    "stages": [
      [
        616
      ],
      [
        617
      ],
      []
    ],
    "members": [
      616,
      617
    ]
  },
  "619": {
    "chainId": 314,
    "baseDex": 619,
    "name": "Mienfoo",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 510,
    "baseRarity": 4,
    "stages": [
      [
        619
      ],
      [
        620
      ],
      []
    ],
    "members": [
      619,
      620
    ]
  },
  "621": {
    "chainId": 315,
    "baseDex": 621,
    "name": "Druddigon",
    "type": "single",
    "maxStage": 1,
    "maxBst": 485,
    "baseRarity": 3,
    "stages": [
      [
        621
      ],
      [],
      []
    ],
    "members": [
      621
    ]
  },
  "622": {
    "chainId": 316,
    "baseDex": 622,
    "name": "Golett",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 483,
    "baseRarity": 3,
    "stages": [
      [
        622
      ],
      [
        623
      ],
      []
    ],
    "members": [
      622,
      623
    ]
  },
  "624": {
    "chainId": 317,
    "baseDex": 624,
    "name": "Pawniard",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 550,
    "baseRarity": 4,
    "stages": [
      [
        624
      ],
      [
        625
      ],
      [
        983
      ]
    ],
    "members": [
      624,
      625,
      983
    ]
  },
  "627": {
    "chainId": 319,
    "baseDex": 627,
    "name": "Rufflet",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 510,
    "baseRarity": 4,
    "stages": [
      [
        627
      ],
      [
        628
      ],
      []
    ],
    "members": [
      627,
      628
    ]
  },
  "629": {
    "chainId": 320,
    "baseDex": 629,
    "name": "Vullaby",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 510,
    "baseRarity": 4,
    "stages": [
      [
        629
      ],
      [
        630
      ],
      []
    ],
    "members": [
      629,
      630
    ]
  },
  "631": {
    "chainId": 321,
    "baseDex": 631,
    "name": "Heatmor",
    "type": "single",
    "maxStage": 1,
    "maxBst": 484,
    "baseRarity": 3,
    "stages": [
      [
        631
      ],
      [],
      []
    ],
    "members": [
      631
    ]
  },
  "632": {
    "chainId": 322,
    "baseDex": 632,
    "name": "Durant",
    "type": "single",
    "maxStage": 1,
    "maxBst": 484,
    "baseRarity": 3,
    "stages": [
      [
        632
      ],
      [],
      []
    ],
    "members": [
      632
    ]
  },
  "633": {
    "chainId": 323,
    "baseDex": 633,
    "name": "Deino",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        633
      ],
      [
        634
      ],
      [
        635
      ]
    ],
    "members": [
      633,
      634,
      635
    ]
  },
  "636": {
    "chainId": 324,
    "baseDex": 636,
    "name": "Larvesta",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 550,
    "baseRarity": 4,
    "stages": [
      [
        636
      ],
      [
        637
      ],
      []
    ],
    "members": [
      636,
      637
    ]
  },
  "638": {
    "chainId": 325,
    "baseDex": 638,
    "name": "Cobalion",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        638
      ],
      [],
      []
    ],
    "members": [
      638
    ]
  },
  "639": {
    "chainId": 326,
    "baseDex": 639,
    "name": "Terrakion",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        639
      ],
      [],
      []
    ],
    "members": [
      639
    ]
  },
  "640": {
    "chainId": 327,
    "baseDex": 640,
    "name": "Virizion",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        640
      ],
      [],
      []
    ],
    "members": [
      640
    ]
  },
  "641": {
    "chainId": 328,
    "baseDex": 641,
    "name": "Tornadus",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        641
      ],
      [],
      []
    ],
    "members": [
      641
    ]
  },
  "642": {
    "chainId": 329,
    "baseDex": 642,
    "name": "Thundurus",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        642
      ],
      [],
      []
    ],
    "members": [
      642
    ]
  },
  "643": {
    "chainId": 330,
    "baseDex": 643,
    "name": "Reshiram",
    "type": "single",
    "maxStage": 1,
    "maxBst": 680,
    "baseRarity": 5,
    "stages": [
      [
        643
      ],
      [],
      []
    ],
    "members": [
      643
    ]
  },
  "644": {
    "chainId": 331,
    "baseDex": 644,
    "name": "Zekrom",
    "type": "single",
    "maxStage": 1,
    "maxBst": 680,
    "baseRarity": 5,
    "stages": [
      [
        644
      ],
      [],
      []
    ],
    "members": [
      644
    ]
  },
  "645": {
    "chainId": 332,
    "baseDex": 645,
    "name": "Landorus",
    "type": "single",
    "maxStage": 1,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        645
      ],
      [],
      []
    ],
    "members": [
      645
    ]
  },
  "646": {
    "chainId": 333,
    "baseDex": 646,
    "name": "Kyurem",
    "type": "single",
    "maxStage": 1,
    "maxBst": 660,
    "baseRarity": 5,
    "stages": [
      [
        646
      ],
      [],
      []
    ],
    "members": [
      646
    ]
  },
  "647": {
    "chainId": 334,
    "baseDex": 647,
    "name": "Keldeo",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        647
      ],
      [],
      []
    ],
    "members": [
      647
    ]
  },
  "648": {
    "chainId": 335,
    "baseDex": 648,
    "name": "Meloetta",
    "type": "single",
    "maxStage": 1,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        648
      ],
      [],
      []
    ],
    "members": [
      648
    ]
  },
  "649": {
    "chainId": 336,
    "baseDex": 649,
    "name": "Genesect",
    "type": "single",
    "maxStage": 1,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        649
      ],
      [],
      []
    ],
    "members": [
      649
    ]
  },
  "650": {
    "chainId": 337,
    "baseDex": 650,
    "name": "Chespin",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        650
      ],
      [
        651
      ],
      [
        652
      ]
    ],
    "members": [
      650,
      651,
      652
    ]
  },
  "653": {
    "chainId": 338,
    "baseDex": 653,
    "name": "Fennekin",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 534,
    "baseRarity": 4,
    "stages": [
      [
        653
      ],
      [
        654
      ],
      [
        655
      ]
    ],
    "members": [
      653,
      654,
      655
    ]
  },
  "656": {
    "chainId": 339,
    "baseDex": 656,
    "name": "Froakie",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        656
      ],
      [
        657
      ],
      [
        658
      ]
    ],
    "members": [
      656,
      657,
      658
    ]
  },
  "659": {
    "chainId": 340,
    "baseDex": 659,
    "name": "Bunnelby",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 423,
    "baseRarity": 3,
    "stages": [
      [
        659
      ],
      [
        660
      ],
      []
    ],
    "members": [
      659,
      660
    ]
  },
  "661": {
    "chainId": 341,
    "baseDex": 661,
    "name": "Fletchling",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 499,
    "baseRarity": 4,
    "stages": [
      [
        661
      ],
      [
        662
      ],
      [
        663
      ]
    ],
    "members": [
      661,
      662,
      663
    ]
  },
  "664": {
    "chainId": 342,
    "baseDex": 664,
    "name": "Scatterbug",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 411,
    "baseRarity": 3,
    "stages": [
      [
        664
      ],
      [
        665
      ],
      [
        666
      ]
    ],
    "members": [
      664,
      665,
      666
    ]
  },
  "667": {
    "chainId": 343,
    "baseDex": 667,
    "name": "Litleo",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 369,
    "baseRarity": 2,
    "stages": [
      [
        667
      ],
      [
        668
      ],
      []
    ],
    "members": [
      667,
      668
    ]
  },
  "669": {
    "chainId": 344,
    "baseDex": 669,
    "name": "Flabébé",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 552,
    "baseRarity": 4,
    "stages": [
      [
        669
      ],
      [
        670
      ],
      [
        671
      ]
    ],
    "members": [
      669,
      670,
      671
    ]
  },
  "672": {
    "chainId": 345,
    "baseDex": 672,
    "name": "Skiddo",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 531,
    "baseRarity": 4,
    "stages": [
      [
        672
      ],
      [
        673
      ],
      []
    ],
    "members": [
      672,
      673
    ]
  },
  "674": {
    "chainId": 346,
    "baseDex": 674,
    "name": "Pancham",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 495,
    "baseRarity": 4,
    "stages": [
      [
        674
      ],
      [
        675
      ],
      []
    ],
    "members": [
      674,
      675
    ]
  },
  "676": {
    "chainId": 347,
    "baseDex": 676,
    "name": "Furfrou",
    "type": "single",
    "maxStage": 1,
    "maxBst": 472,
    "baseRarity": 3,
    "stages": [
      [
        676
      ],
      [],
      []
    ],
    "members": [
      676
    ]
  },
  "677": {
    "chainId": 348,
    "baseDex": 677,
    "name": "Espurr",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 466,
    "baseRarity": 3,
    "stages": [
      [
        677
      ],
      [
        678
      ],
      []
    ],
    "members": [
      677,
      678
    ]
  },
  "679": {
    "chainId": 349,
    "baseDex": 679,
    "name": "Honedge",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        679
      ],
      [
        680
      ],
      [
        681
      ]
    ],
    "members": [
      679,
      680,
      681
    ]
  },
  "682": {
    "chainId": 350,
    "baseDex": 682,
    "name": "Spritzee",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 341,
    "baseRarity": 2,
    "stages": [
      [
        682
      ],
      [
        683
      ],
      []
    ],
    "members": [
      682,
      683
    ]
  },
  "684": {
    "chainId": 351,
    "baseDex": 684,
    "name": "Swirlix",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 480,
    "baseRarity": 3,
    "stages": [
      [
        684
      ],
      [
        685
      ],
      []
    ],
    "members": [
      684,
      685
    ]
  },
  "686": {
    "chainId": 352,
    "baseDex": 686,
    "name": "Inkay",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 482,
    "baseRarity": 3,
    "stages": [
      [
        686
      ],
      [
        687
      ],
      []
    ],
    "members": [
      686,
      687
    ]
  },
  "688": {
    "chainId": 353,
    "baseDex": 688,
    "name": "Binacle",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        688
      ],
      [
        689
      ],
      []
    ],
    "members": [
      688,
      689
    ]
  },
  "690": {
    "chainId": 354,
    "baseDex": 690,
    "name": "Skrelp",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 494,
    "baseRarity": 3,
    "stages": [
      [
        690
      ],
      [
        691
      ],
      []
    ],
    "members": [
      690,
      691
    ]
  },
  "692": {
    "chainId": 355,
    "baseDex": 692,
    "name": "Clauncher",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        692
      ],
      [
        693
      ],
      []
    ],
    "members": [
      692,
      693
    ]
  },
  "694": {
    "chainId": 356,
    "baseDex": 694,
    "name": "Helioptile",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 481,
    "baseRarity": 3,
    "stages": [
      [
        694
      ],
      [
        695
      ],
      []
    ],
    "members": [
      694,
      695
    ]
  },
  "696": {
    "chainId": 357,
    "baseDex": 696,
    "name": "Tyrunt",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 521,
    "baseRarity": 4,
    "stages": [
      [
        696
      ],
      [
        697
      ],
      []
    ],
    "members": [
      696,
      697
    ]
  },
  "698": {
    "chainId": 358,
    "baseDex": 698,
    "name": "Amaura",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 521,
    "baseRarity": 4,
    "stages": [
      [
        698
      ],
      [
        699
      ],
      []
    ],
    "members": [
      698,
      699
    ]
  },
  "701": {
    "chainId": 359,
    "baseDex": 701,
    "name": "Hawlucha",
    "type": "single",
    "maxStage": 1,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        701
      ],
      [],
      []
    ],
    "members": [
      701
    ]
  },
  "702": {
    "chainId": 360,
    "baseDex": 702,
    "name": "Dedenne",
    "type": "single",
    "maxStage": 1,
    "maxBst": 431,
    "baseRarity": 3,
    "stages": [
      [
        702
      ],
      [],
      []
    ],
    "members": [
      702
    ]
  },
  "703": {
    "chainId": 361,
    "baseDex": 703,
    "name": "Carbink",
    "type": "single",
    "maxStage": 1,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        703
      ],
      [],
      []
    ],
    "members": [
      703
    ]
  },
  "704": {
    "chainId": 362,
    "baseDex": 704,
    "name": "Goomy",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        704
      ],
      [
        705
      ],
      [
        706
      ]
    ],
    "members": [
      704,
      705,
      706
    ]
  },
  "707": {
    "chainId": 363,
    "baseDex": 707,
    "name": "Klefki",
    "type": "single",
    "maxStage": 1,
    "maxBst": 470,
    "baseRarity": 3,
    "stages": [
      [
        707
      ],
      [],
      []
    ],
    "members": [
      707
    ]
  },
  "708": {
    "chainId": 364,
    "baseDex": 708,
    "name": "Phantump",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 474,
    "baseRarity": 3,
    "stages": [
      [
        708
      ],
      [
        709
      ],
      []
    ],
    "members": [
      708,
      709
    ]
  },
  "710": {
    "chainId": 365,
    "baseDex": 710,
    "name": "Pumpkaboo",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 494,
    "baseRarity": 3,
    "stages": [
      [
        710
      ],
      [
        711
      ],
      []
    ],
    "members": [
      710,
      711
    ]
  },
  "712": {
    "chainId": 366,
    "baseDex": 712,
    "name": "Bergmite",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 514,
    "baseRarity": 4,
    "stages": [
      [
        712
      ],
      [
        713
      ],
      []
    ],
    "members": [
      712,
      713
    ]
  },
  "714": {
    "chainId": 367,
    "baseDex": 714,
    "name": "Noibat",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 535,
    "baseRarity": 4,
    "stages": [
      [
        714
      ],
      [
        715
      ],
      []
    ],
    "members": [
      714,
      715
    ]
  },
  "716": {
    "chainId": 368,
    "baseDex": 716,
    "name": "Xerneas",
    "type": "single",
    "maxStage": 1,
    "maxBst": 680,
    "baseRarity": 5,
    "stages": [
      [
        716
      ],
      [],
      []
    ],
    "members": [
      716
    ]
  },
  "717": {
    "chainId": 369,
    "baseDex": 717,
    "name": "Yveltal",
    "type": "single",
    "maxStage": 1,
    "maxBst": 680,
    "baseRarity": 5,
    "stages": [
      [
        717
      ],
      [],
      []
    ],
    "members": [
      717
    ]
  },
  "718": {
    "chainId": 370,
    "baseDex": 718,
    "name": "Zygarde",
    "type": "single",
    "maxStage": 1,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        718
      ],
      [],
      []
    ],
    "members": [
      718
    ]
  },
  "719": {
    "chainId": 371,
    "baseDex": 719,
    "name": "Diancie",
    "type": "single",
    "maxStage": 1,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        719
      ],
      [],
      []
    ],
    "members": [
      719
    ]
  },
  "720": {
    "chainId": 372,
    "baseDex": 720,
    "name": "Hoopa",
    "type": "single",
    "maxStage": 1,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        720
      ],
      [],
      []
    ],
    "members": [
      720
    ]
  },
  "721": {
    "chainId": 373,
    "baseDex": 721,
    "name": "Volcanion",
    "type": "single",
    "maxStage": 1,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        721
      ],
      [],
      []
    ],
    "members": [
      721
    ]
  },
  "722": {
    "chainId": 374,
    "baseDex": 722,
    "name": "Rowlet",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        722
      ],
      [
        723
      ],
      [
        724
      ]
    ],
    "members": [
      722,
      723,
      724
    ]
  },
  "725": {
    "chainId": 375,
    "baseDex": 725,
    "name": "Litten",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        725
      ],
      [
        726
      ],
      [
        727
      ]
    ],
    "members": [
      725,
      726,
      727
    ]
  },
  "728": {
    "chainId": 376,
    "baseDex": 728,
    "name": "Popplio",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        728
      ],
      [
        729
      ],
      [
        730
      ]
    ],
    "members": [
      728,
      729,
      730
    ]
  },
  "731": {
    "chainId": 377,
    "baseDex": 731,
    "name": "Pikipek",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 265,
    "baseRarity": 1,
    "stages": [
      [
        731
      ],
      [
        732
      ],
      [
        733
      ]
    ],
    "members": [
      731,
      732,
      733
    ]
  },
  "734": {
    "chainId": 378,
    "baseDex": 734,
    "name": "Yungoos",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 253,
    "baseRarity": 1,
    "stages": [
      [
        734
      ],
      [
        735
      ],
      []
    ],
    "members": [
      734,
      735
    ]
  },
  "736": {
    "chainId": 379,
    "baseDex": 736,
    "name": "Grubbin",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        736
      ],
      [
        737
      ],
      [
        738
      ]
    ],
    "members": [
      736,
      737,
      738
    ]
  },
  "739": {
    "chainId": 380,
    "baseDex": 739,
    "name": "Crabrawler",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 478,
    "baseRarity": 3,
    "stages": [
      [
        739
      ],
      [
        740
      ],
      []
    ],
    "members": [
      739,
      740
    ]
  },
  "741": {
    "chainId": 381,
    "baseDex": 741,
    "name": "Oricorio",
    "type": "single",
    "maxStage": 1,
    "maxBst": 476,
    "baseRarity": 3,
    "stages": [
      [
        741
      ],
      [],
      []
    ],
    "members": [
      741
    ]
  },
  "742": {
    "chainId": 382,
    "baseDex": 742,
    "name": "Cutiefly",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 464,
    "baseRarity": 3,
    "stages": [
      [
        742
      ],
      [
        743
      ],
      []
    ],
    "members": [
      742,
      743
    ]
  },
  "744": {
    "chainId": 383,
    "baseDex": 744,
    "name": "Rockruff",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 487,
    "baseRarity": 3,
    "stages": [
      [
        744
      ],
      [
        745
      ],
      []
    ],
    "members": [
      744,
      745
    ]
  },
  "746": {
    "chainId": 384,
    "baseDex": 746,
    "name": "Wishiwashi",
    "type": "single",
    "maxStage": 1,
    "maxBst": 175,
    "baseRarity": 1,
    "stages": [
      [
        746
      ],
      [],
      []
    ],
    "members": [
      746
    ]
  },
  "747": {
    "chainId": 385,
    "baseDex": 747,
    "name": "Mareanie",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 495,
    "baseRarity": 4,
    "stages": [
      [
        747
      ],
      [
        748
      ],
      []
    ],
    "members": [
      747,
      748
    ]
  },
  "749": {
    "chainId": 386,
    "baseDex": 749,
    "name": "Mudbray",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        749
      ],
      [
        750
      ],
      []
    ],
    "members": [
      749,
      750
    ]
  },
  "751": {
    "chainId": 387,
    "baseDex": 751,
    "name": "Dewpider",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 454,
    "baseRarity": 3,
    "stages": [
      [
        751
      ],
      [
        752
      ],
      []
    ],
    "members": [
      751,
      752
    ]
  },
  "753": {
    "chainId": 388,
    "baseDex": 753,
    "name": "Fomantis",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 480,
    "baseRarity": 3,
    "stages": [
      [
        753
      ],
      [
        754
      ],
      []
    ],
    "members": [
      753,
      754
    ]
  },
  "755": {
    "chainId": 389,
    "baseDex": 755,
    "name": "Morelull",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 285,
    "baseRarity": 1,
    "stages": [
      [
        755
      ],
      [
        756
      ],
      []
    ],
    "members": [
      755,
      756
    ]
  },
  "757": {
    "chainId": 390,
    "baseDex": 757,
    "name": "Salandit",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 480,
    "baseRarity": 3,
    "stages": [
      [
        757
      ],
      [
        758
      ],
      []
    ],
    "members": [
      757,
      758
    ]
  },
  "759": {
    "chainId": 391,
    "baseDex": 759,
    "name": "Stufful",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        759
      ],
      [
        760
      ],
      []
    ],
    "members": [
      759,
      760
    ]
  },
  "761": {
    "chainId": 392,
    "baseDex": 761,
    "name": "Bounsweet",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 510,
    "baseRarity": 4,
    "stages": [
      [
        761
      ],
      [
        762
      ],
      [
        763
      ]
    ],
    "members": [
      761,
      762,
      763
    ]
  },
  "764": {
    "chainId": 393,
    "baseDex": 764,
    "name": "Comfey",
    "type": "single",
    "maxStage": 1,
    "maxBst": 485,
    "baseRarity": 3,
    "stages": [
      [
        764
      ],
      [],
      []
    ],
    "members": [
      764
    ]
  },
  "766": {
    "chainId": 395,
    "baseDex": 766,
    "name": "Passimian",
    "type": "single",
    "maxStage": 1,
    "maxBst": 490,
    "baseRarity": 3,
    "stages": [
      [
        766
      ],
      [],
      []
    ],
    "members": [
      766
    ]
  },
  "767": {
    "chainId": 396,
    "baseDex": 767,
    "name": "Wimpod",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        767
      ],
      [
        768
      ],
      []
    ],
    "members": [
      767,
      768
    ]
  },
  "769": {
    "chainId": 397,
    "baseDex": 769,
    "name": "Sandygast",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 480,
    "baseRarity": 3,
    "stages": [
      [
        769
      ],
      [
        770
      ],
      []
    ],
    "members": [
      769,
      770
    ]
  },
  "771": {
    "chainId": 398,
    "baseDex": 771,
    "name": "Pyukumuku",
    "type": "single",
    "maxStage": 1,
    "maxBst": 410,
    "baseRarity": 3,
    "stages": [
      [
        771
      ],
      [],
      []
    ],
    "members": [
      771
    ]
  },
  "772": {
    "chainId": 399,
    "baseDex": 772,
    "name": "Código Cero",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 570,
    "baseRarity": 5,
    "stages": [
      [
        772
      ],
      [
        773
      ],
      []
    ],
    "members": [
      772,
      773
    ]
  },
  "774": {
    "chainId": 400,
    "baseDex": 774,
    "name": "Minior",
    "type": "single",
    "maxStage": 1,
    "maxBst": 440,
    "baseRarity": 3,
    "stages": [
      [
        774
      ],
      [],
      []
    ],
    "members": [
      774
    ]
  },
  "775": {
    "chainId": 401,
    "baseDex": 775,
    "name": "Komala",
    "type": "single",
    "maxStage": 1,
    "maxBst": 480,
    "baseRarity": 3,
    "stages": [
      [
        775
      ],
      [],
      []
    ],
    "members": [
      775
    ]
  },
  "776": {
    "chainId": 402,
    "baseDex": 776,
    "name": "Turtonator",
    "type": "single",
    "maxStage": 1,
    "maxBst": 485,
    "baseRarity": 3,
    "stages": [
      [
        776
      ],
      [],
      []
    ],
    "members": [
      776
    ]
  },
  "777": {
    "chainId": 403,
    "baseDex": 777,
    "name": "Togedemaru",
    "type": "single",
    "maxStage": 1,
    "maxBst": 435,
    "baseRarity": 3,
    "stages": [
      [
        777
      ],
      [],
      []
    ],
    "members": [
      777
    ]
  },
  "778": {
    "chainId": 404,
    "baseDex": 778,
    "name": "Mimikyu",
    "type": "single",
    "maxStage": 1,
    "maxBst": 476,
    "baseRarity": 3,
    "stages": [
      [
        778
      ],
      [],
      []
    ],
    "members": [
      778
    ]
  },
  "779": {
    "chainId": 405,
    "baseDex": 779,
    "name": "Bruxish",
    "type": "single",
    "maxStage": 1,
    "maxBst": 475,
    "baseRarity": 3,
    "stages": [
      [
        779
      ],
      [],
      []
    ],
    "members": [
      779
    ]
  },
  "780": {
    "chainId": 406,
    "baseDex": 780,
    "name": "Drampa",
    "type": "single",
    "maxStage": 1,
    "maxBst": 485,
    "baseRarity": 3,
    "stages": [
      [
        780
      ],
      [],
      []
    ],
    "members": [
      780
    ]
  },
  "781": {
    "chainId": 407,
    "baseDex": 781,
    "name": "Dhelmise",
    "type": "single",
    "maxStage": 1,
    "maxBst": 517,
    "baseRarity": 4,
    "stages": [
      [
        781
      ],
      [],
      []
    ],
    "members": [
      781
    ]
  },
  "782": {
    "chainId": 408,
    "baseDex": 782,
    "name": "Jangmo-o",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        782
      ],
      [
        783
      ],
      [
        784
      ]
    ],
    "members": [
      782,
      783,
      784
    ]
  },
  "785": {
    "chainId": 409,
    "baseDex": 785,
    "name": "Tapu Koko",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 5,
    "stages": [
      [
        785
      ],
      [],
      []
    ],
    "members": [
      785
    ]
  },
  "786": {
    "chainId": 410,
    "baseDex": 786,
    "name": "Tapu Lele",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 5,
    "stages": [
      [
        786
      ],
      [],
      []
    ],
    "members": [
      786
    ]
  },
  "787": {
    "chainId": 411,
    "baseDex": 787,
    "name": "Tapu Bulu",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 5,
    "stages": [
      [
        787
      ],
      [],
      []
    ],
    "members": [
      787
    ]
  },
  "788": {
    "chainId": 412,
    "baseDex": 788,
    "name": "Tapu Fini",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 5,
    "stages": [
      [
        788
      ],
      [],
      []
    ],
    "members": [
      788
    ]
  },
  "789": {
    "chainId": 413,
    "baseDex": 789,
    "name": "Cosmog",
    "type": "branch",
    "maxStage": 3,
    "maxBst": 680,
    "baseRarity": 5,
    "stages": [
      [
        789
      ],
      [
        790
      ],
      [
        791,
        792
      ]
    ],
    "members": [
      789,
      790,
      791,
      792
    ]
  },
  "793": {
    "chainId": 414,
    "baseDex": 793,
    "name": "Nihilego",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 4,
    "stages": [
      [
        793
      ],
      [],
      []
    ],
    "members": [
      793
    ]
  },
  "794": {
    "chainId": 415,
    "baseDex": 794,
    "name": "Buzzwole",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 4,
    "stages": [
      [
        794
      ],
      [],
      []
    ],
    "members": [
      794
    ]
  },
  "795": {
    "chainId": 416,
    "baseDex": 795,
    "name": "Pheromosa",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 4,
    "stages": [
      [
        795
      ],
      [],
      []
    ],
    "members": [
      795
    ]
  },
  "796": {
    "chainId": 417,
    "baseDex": 796,
    "name": "Xurkitree",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 4,
    "stages": [
      [
        796
      ],
      [],
      []
    ],
    "members": [
      796
    ]
  },
  "797": {
    "chainId": 418,
    "baseDex": 797,
    "name": "Celesteela",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 4,
    "stages": [
      [
        797
      ],
      [],
      []
    ],
    "members": [
      797
    ]
  },
  "798": {
    "chainId": 419,
    "baseDex": 798,
    "name": "Kartana",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 4,
    "stages": [
      [
        798
      ],
      [],
      []
    ],
    "members": [
      798
    ]
  },
  "799": {
    "chainId": 420,
    "baseDex": 799,
    "name": "Guzzlord",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 4,
    "stages": [
      [
        799
      ],
      [],
      []
    ],
    "members": [
      799
    ]
  },
  "800": {
    "chainId": 421,
    "baseDex": 800,
    "name": "Necrozma",
    "type": "single",
    "maxStage": 1,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        800
      ],
      [],
      []
    ],
    "members": [
      800
    ]
  },
  "801": {
    "chainId": 422,
    "baseDex": 801,
    "name": "Magearna",
    "type": "single",
    "maxStage": 1,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        801
      ],
      [],
      []
    ],
    "members": [
      801
    ]
  },
  "802": {
    "chainId": 423,
    "baseDex": 802,
    "name": "Marshadow",
    "type": "single",
    "maxStage": 1,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        802
      ],
      [],
      []
    ],
    "members": [
      802
    ]
  },
  "803": {
    "chainId": 424,
    "baseDex": 803,
    "name": "Poipole",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 540,
    "baseRarity": 4,
    "stages": [
      [
        803
      ],
      [
        804
      ],
      []
    ],
    "members": [
      803,
      804
    ]
  },
  "805": {
    "chainId": 425,
    "baseDex": 805,
    "name": "Stakataka",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 4,
    "stages": [
      [
        805
      ],
      [],
      []
    ],
    "members": [
      805
    ]
  },
  "806": {
    "chainId": 426,
    "baseDex": 806,
    "name": "Blacephalon",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 4,
    "stages": [
      [
        806
      ],
      [],
      []
    ],
    "members": [
      806
    ]
  },
  "807": {
    "chainId": 427,
    "baseDex": 807,
    "name": "Zeraora",
    "type": "single",
    "maxStage": 1,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        807
      ],
      [],
      []
    ],
    "members": [
      807
    ]
  },
  "808": {
    "chainId": 428,
    "baseDex": 808,
    "name": "Meltan",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        808
      ],
      [
        809
      ],
      []
    ],
    "members": [
      808,
      809
    ]
  },
  "810": {
    "chainId": 430,
    "baseDex": 810,
    "name": "Grookey",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        810
      ],
      [
        811
      ],
      [
        812
      ]
    ],
    "members": [
      810,
      811,
      812
    ]
  },
  "813": {
    "chainId": 431,
    "baseDex": 813,
    "name": "Scorbunny",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        813
      ],
      [
        814
      ],
      [
        815
      ]
    ],
    "members": [
      813,
      814,
      815
    ]
  },
  "816": {
    "chainId": 432,
    "baseDex": 816,
    "name": "Sobble",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        816
      ],
      [
        817
      ],
      [
        818
      ]
    ],
    "members": [
      816,
      817,
      818
    ]
  },
  "819": {
    "chainId": 433,
    "baseDex": 819,
    "name": "Skwovet",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 460,
    "baseRarity": 3,
    "stages": [
      [
        819
      ],
      [
        820
      ],
      []
    ],
    "members": [
      819,
      820
    ]
  },
  "821": {
    "chainId": 434,
    "baseDex": 821,
    "name": "Rookidee",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 495,
    "baseRarity": 4,
    "stages": [
      [
        821
      ],
      [
        822
      ],
      [
        823
      ]
    ],
    "members": [
      821,
      822,
      823
    ]
  },
  "824": {
    "chainId": 435,
    "baseDex": 824,
    "name": "Blipbug",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 505,
    "baseRarity": 4,
    "stages": [
      [
        824
      ],
      [
        825
      ],
      [
        826
      ]
    ],
    "members": [
      824,
      825,
      826
    ]
  },
  "827": {
    "chainId": 436,
    "baseDex": 827,
    "name": "Nickit",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 455,
    "baseRarity": 3,
    "stages": [
      [
        827
      ],
      [
        828
      ],
      []
    ],
    "members": [
      827,
      828
    ]
  },
  "829": {
    "chainId": 437,
    "baseDex": 829,
    "name": "Gossifleur",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 460,
    "baseRarity": 3,
    "stages": [
      [
        829
      ],
      [
        830
      ],
      []
    ],
    "members": [
      829,
      830
    ]
  },
  "831": {
    "chainId": 438,
    "baseDex": 831,
    "name": "Wooloo",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 490,
    "baseRarity": 3,
    "stages": [
      [
        831
      ],
      [
        832
      ],
      []
    ],
    "members": [
      831,
      832
    ]
  },
  "833": {
    "chainId": 439,
    "baseDex": 833,
    "name": "Chewtle",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 485,
    "baseRarity": 3,
    "stages": [
      [
        833
      ],
      [
        834
      ],
      []
    ],
    "members": [
      833,
      834
    ]
  },
  "835": {
    "chainId": 440,
    "baseDex": 835,
    "name": "Yamper",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 490,
    "baseRarity": 3,
    "stages": [
      [
        835
      ],
      [
        836
      ],
      []
    ],
    "members": [
      835,
      836
    ]
  },
  "840": {
    "chainId": 442,
    "baseDex": 840,
    "name": "Applin",
    "type": "branch",
    "maxStage": 3,
    "maxBst": 540,
    "baseRarity": 4,
    "stages": [
      [
        840
      ],
      [
        841,
        842,
        1011
      ],
      [
        1019
      ]
    ],
    "members": [
      840,
      841,
      842,
      1011,
      1019
    ]
  },
  "843": {
    "chainId": 443,
    "baseDex": 843,
    "name": "Silicobra",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 510,
    "baseRarity": 4,
    "stages": [
      [
        843
      ],
      [
        844
      ],
      []
    ],
    "members": [
      843,
      844
    ]
  },
  "845": {
    "chainId": 444,
    "baseDex": 845,
    "name": "Cramorant",
    "type": "single",
    "maxStage": 1,
    "maxBst": 475,
    "baseRarity": 3,
    "stages": [
      [
        845
      ],
      [],
      []
    ],
    "members": [
      845
    ]
  },
  "846": {
    "chainId": 445,
    "baseDex": 846,
    "name": "Arrokuda",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 490,
    "baseRarity": 3,
    "stages": [
      [
        846
      ],
      [
        847
      ],
      []
    ],
    "members": [
      846,
      847
    ]
  },
  "848": {
    "chainId": 446,
    "baseDex": 848,
    "name": "Toxel",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 502,
    "baseRarity": 4,
    "stages": [
      [
        848
      ],
      [
        849
      ],
      []
    ],
    "members": [
      848,
      849
    ]
  },
  "850": {
    "chainId": 447,
    "baseDex": 850,
    "name": "Sizzlipede",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 525,
    "baseRarity": 4,
    "stages": [
      [
        850
      ],
      [
        851
      ],
      []
    ],
    "members": [
      850,
      851
    ]
  },
  "852": {
    "chainId": 448,
    "baseDex": 852,
    "name": "Clobbopus",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 480,
    "baseRarity": 3,
    "stages": [
      [
        852
      ],
      [
        853
      ],
      []
    ],
    "members": [
      852,
      853
    ]
  },
  "854": {
    "chainId": 449,
    "baseDex": 854,
    "name": "Sinistea",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 508,
    "baseRarity": 4,
    "stages": [
      [
        854
      ],
      [
        855
      ],
      []
    ],
    "members": [
      854,
      855
    ]
  },
  "856": {
    "chainId": 450,
    "baseDex": 856,
    "name": "Hatenna",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 510,
    "baseRarity": 4,
    "stages": [
      [
        856
      ],
      [
        857
      ],
      [
        858
      ]
    ],
    "members": [
      856,
      857,
      858
    ]
  },
  "859": {
    "chainId": 451,
    "baseDex": 859,
    "name": "Impidimp",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 510,
    "baseRarity": 4,
    "stages": [
      [
        859
      ],
      [
        860
      ],
      [
        861
      ]
    ],
    "members": [
      859,
      860,
      861
    ]
  },
  "868": {
    "chainId": 452,
    "baseDex": 868,
    "name": "Milcery",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 495,
    "baseRarity": 4,
    "stages": [
      [
        868
      ],
      [
        869
      ],
      []
    ],
    "members": [
      868,
      869
    ]
  },
  "871": {
    "chainId": 454,
    "baseDex": 871,
    "name": "Pincurchin",
    "type": "single",
    "maxStage": 1,
    "maxBst": 435,
    "baseRarity": 3,
    "stages": [
      [
        871
      ],
      [],
      []
    ],
    "members": [
      871
    ]
  },
  "872": {
    "chainId": 455,
    "baseDex": 872,
    "name": "Snom",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 475,
    "baseRarity": 3,
    "stages": [
      [
        872
      ],
      [
        873
      ],
      []
    ],
    "members": [
      872,
      873
    ]
  },
  "874": {
    "chainId": 456,
    "baseDex": 874,
    "name": "Stonjourner",
    "type": "single",
    "maxStage": 1,
    "maxBst": 470,
    "baseRarity": 3,
    "stages": [
      [
        874
      ],
      [],
      []
    ],
    "members": [
      874
    ]
  },
  "875": {
    "chainId": 457,
    "baseDex": 875,
    "name": "Eiscue",
    "type": "single",
    "maxStage": 1,
    "maxBst": 470,
    "baseRarity": 3,
    "stages": [
      [
        875
      ],
      [],
      []
    ],
    "members": [
      875
    ]
  },
  "876": {
    "chainId": 458,
    "baseDex": 876,
    "name": "Indeedee",
    "type": "single",
    "maxStage": 1,
    "maxBst": 475,
    "baseRarity": 3,
    "stages": [
      [
        876
      ],
      [],
      []
    ],
    "members": [
      876
    ]
  },
  "877": {
    "chainId": 459,
    "baseDex": 877,
    "name": "Morpeko",
    "type": "single",
    "maxStage": 1,
    "maxBst": 436,
    "baseRarity": 3,
    "stages": [
      [
        877
      ],
      [],
      []
    ],
    "members": [
      877
    ]
  },
  "880": {
    "chainId": 461,
    "baseDex": 880,
    "name": "Dracozolt",
    "type": "single",
    "maxStage": 1,
    "maxBst": 505,
    "baseRarity": 4,
    "stages": [
      [
        880
      ],
      [],
      []
    ],
    "members": [
      880
    ]
  },
  "881": {
    "chainId": 462,
    "baseDex": 881,
    "name": "Arctozolt",
    "type": "single",
    "maxStage": 1,
    "maxBst": 505,
    "baseRarity": 4,
    "stages": [
      [
        881
      ],
      [],
      []
    ],
    "members": [
      881
    ]
  },
  "882": {
    "chainId": 463,
    "baseDex": 882,
    "name": "Dracovish",
    "type": "single",
    "maxStage": 1,
    "maxBst": 505,
    "baseRarity": 4,
    "stages": [
      [
        882
      ],
      [],
      []
    ],
    "members": [
      882
    ]
  },
  "883": {
    "chainId": 464,
    "baseDex": 883,
    "name": "Arctovish",
    "type": "single",
    "maxStage": 1,
    "maxBst": 505,
    "baseRarity": 4,
    "stages": [
      [
        883
      ],
      [],
      []
    ],
    "members": [
      883
    ]
  },
  "884": {
    "chainId": 465,
    "baseDex": 884,
    "name": "Duraludon",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        884
      ],
      [
        1018
      ],
      []
    ],
    "members": [
      884,
      1018
    ]
  },
  "885": {
    "chainId": 466,
    "baseDex": 885,
    "name": "Dreepy",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        885
      ],
      [
        886
      ],
      [
        887
      ]
    ],
    "members": [
      885,
      886,
      887
    ]
  },
  "888": {
    "chainId": 467,
    "baseDex": 888,
    "name": "Zacian",
    "type": "single",
    "maxStage": 1,
    "maxBst": 660,
    "baseRarity": 5,
    "stages": [
      [
        888
      ],
      [],
      []
    ],
    "members": [
      888
    ]
  },
  "889": {
    "chainId": 468,
    "baseDex": 889,
    "name": "Zamazenta",
    "type": "single",
    "maxStage": 1,
    "maxBst": 660,
    "baseRarity": 5,
    "stages": [
      [
        889
      ],
      [],
      []
    ],
    "members": [
      889
    ]
  },
  "890": {
    "chainId": 469,
    "baseDex": 890,
    "name": "Eternatus",
    "type": "single",
    "maxStage": 1,
    "maxBst": 690,
    "baseRarity": 5,
    "stages": [
      [
        890
      ],
      [],
      []
    ],
    "members": [
      890
    ]
  },
  "891": {
    "chainId": 470,
    "baseDex": 891,
    "name": "Kubfu",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 550,
    "baseRarity": 5,
    "stages": [
      [
        891
      ],
      [
        892
      ],
      []
    ],
    "members": [
      891,
      892
    ]
  },
  "894": {
    "chainId": 472,
    "baseDex": 894,
    "name": "Regieleki",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        894
      ],
      [],
      []
    ],
    "members": [
      894
    ]
  },
  "895": {
    "chainId": 473,
    "baseDex": 895,
    "name": "Regidrago",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        895
      ],
      [],
      []
    ],
    "members": [
      895
    ]
  },
  "896": {
    "chainId": 474,
    "baseDex": 896,
    "name": "Glastrier",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        896
      ],
      [],
      []
    ],
    "members": [
      896
    ]
  },
  "897": {
    "chainId": 475,
    "baseDex": 897,
    "name": "Spectrier",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        897
      ],
      [],
      []
    ],
    "members": [
      897
    ]
  },
  "898": {
    "chainId": 476,
    "baseDex": 898,
    "name": "Calyrex",
    "type": "single",
    "maxStage": 1,
    "maxBst": 500,
    "baseRarity": 5,
    "stages": [
      [
        898
      ],
      [],
      []
    ],
    "members": [
      898
    ]
  },
  "905": {
    "chainId": 477,
    "baseDex": 905,
    "name": "Enamorus",
    "type": "single",
    "maxStage": 1,
    "maxBst": 580,
    "baseRarity": 5,
    "stages": [
      [
        905
      ],
      [],
      []
    ],
    "members": [
      905
    ]
  },
  "906": {
    "chainId": 478,
    "baseDex": 906,
    "name": "Sprigatito",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        906
      ],
      [
        907
      ],
      [
        908
      ]
    ],
    "members": [
      906,
      907,
      908
    ]
  },
  "909": {
    "chainId": 479,
    "baseDex": 909,
    "name": "Fuecoco",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        909
      ],
      [
        910
      ],
      [
        911
      ]
    ],
    "members": [
      909,
      910,
      911
    ]
  },
  "912": {
    "chainId": 480,
    "baseDex": 912,
    "name": "Quaxly",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        912
      ],
      [
        913
      ],
      [
        914
      ]
    ],
    "members": [
      912,
      913,
      914
    ]
  },
  "915": {
    "chainId": 481,
    "baseDex": 915,
    "name": "Lechonk",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 489,
    "baseRarity": 3,
    "stages": [
      [
        915
      ],
      [
        916
      ],
      []
    ],
    "members": [
      915,
      916
    ]
  },
  "917": {
    "chainId": 482,
    "baseDex": 917,
    "name": "Tarountula",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 404,
    "baseRarity": 2,
    "stages": [
      [
        917
      ],
      [
        918
      ],
      []
    ],
    "members": [
      917,
      918
    ]
  },
  "919": {
    "chainId": 483,
    "baseDex": 919,
    "name": "Nymble",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 450,
    "baseRarity": 3,
    "stages": [
      [
        919
      ],
      [
        920
      ],
      []
    ],
    "members": [
      919,
      920
    ]
  },
  "921": {
    "chainId": 484,
    "baseDex": 921,
    "name": "Pawmi",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 490,
    "baseRarity": 3,
    "stages": [
      [
        921
      ],
      [
        922
      ],
      [
        923
      ]
    ],
    "members": [
      921,
      922,
      923
    ]
  },
  "924": {
    "chainId": 485,
    "baseDex": 924,
    "name": "Tandemaus",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 470,
    "baseRarity": 3,
    "stages": [
      [
        924
      ],
      [
        925
      ],
      []
    ],
    "members": [
      924,
      925
    ]
  },
  "926": {
    "chainId": 486,
    "baseDex": 926,
    "name": "Fidough",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 477,
    "baseRarity": 3,
    "stages": [
      [
        926
      ],
      [
        927
      ],
      []
    ],
    "members": [
      926,
      927
    ]
  },
  "928": {
    "chainId": 487,
    "baseDex": 928,
    "name": "Smoliv",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 510,
    "baseRarity": 4,
    "stages": [
      [
        928
      ],
      [
        929
      ],
      [
        930
      ]
    ],
    "members": [
      928,
      929,
      930
    ]
  },
  "932": {
    "chainId": 489,
    "baseDex": 932,
    "name": "Nacli",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        932
      ],
      [
        933
      ],
      [
        934
      ]
    ],
    "members": [
      932,
      933,
      934
    ]
  },
  "935": {
    "chainId": 490,
    "baseDex": 935,
    "name": "Charcadet",
    "type": "branch",
    "maxStage": 2,
    "maxBst": 525,
    "baseRarity": 4,
    "stages": [
      [
        935
      ],
      [
        936,
        937
      ],
      []
    ],
    "members": [
      935,
      936,
      937
    ]
  },
  "938": {
    "chainId": 491,
    "baseDex": 938,
    "name": "Tadbulb",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 495,
    "baseRarity": 4,
    "stages": [
      [
        938
      ],
      [
        939
      ],
      []
    ],
    "members": [
      938,
      939
    ]
  },
  "940": {
    "chainId": 492,
    "baseDex": 940,
    "name": "Wattrel",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 490,
    "baseRarity": 3,
    "stages": [
      [
        940
      ],
      [
        941
      ],
      []
    ],
    "members": [
      940,
      941
    ]
  },
  "946": {
    "chainId": 495,
    "baseDex": 946,
    "name": "Bramblin",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 275,
    "baseRarity": 1,
    "stages": [
      [
        946
      ],
      [
        947
      ],
      []
    ],
    "members": [
      946,
      947
    ]
  },
  "951": {
    "chainId": 498,
    "baseDex": 951,
    "name": "Capsakid",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 486,
    "baseRarity": 3,
    "stages": [
      [
        951
      ],
      [
        952
      ],
      []
    ],
    "members": [
      951,
      952
    ]
  },
  "953": {
    "chainId": 499,
    "baseDex": 953,
    "name": "Rellor",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 270,
    "baseRarity": 1,
    "stages": [
      [
        953
      ],
      [
        954
      ],
      []
    ],
    "members": [
      953,
      954
    ]
  },
  "955": {
    "chainId": 500,
    "baseDex": 955,
    "name": "Flittle",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 255,
    "baseRarity": 1,
    "stages": [
      [
        955
      ],
      [
        956
      ],
      []
    ],
    "members": [
      955,
      956
    ]
  },
  "957": {
    "chainId": 501,
    "baseDex": 957,
    "name": "Tinkatink",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 506,
    "baseRarity": 4,
    "stages": [
      [
        957
      ],
      [
        958
      ],
      [
        959
      ]
    ],
    "members": [
      957,
      958,
      959
    ]
  },
  "960": {
    "chainId": 502,
    "baseDex": 960,
    "name": "Wiglett",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 425,
    "baseRarity": 3,
    "stages": [
      [
        960
      ],
      [
        961
      ],
      []
    ],
    "members": [
      960,
      961
    ]
  },
  "963": {
    "chainId": 504,
    "baseDex": 963,
    "name": "Finizen",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 457,
    "baseRarity": 3,
    "stages": [
      [
        963
      ],
      [
        964
      ],
      []
    ],
    "members": [
      963,
      964
    ]
  },
  "965": {
    "chainId": 505,
    "baseDex": 965,
    "name": "Varoom",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 500,
    "baseRarity": 4,
    "stages": [
      [
        965
      ],
      [
        966
      ],
      []
    ],
    "members": [
      965,
      966
    ]
  },
  "967": {
    "chainId": 506,
    "baseDex": 967,
    "name": "Cyclizar",
    "type": "single",
    "maxStage": 1,
    "maxBst": 501,
    "baseRarity": 4,
    "stages": [
      [
        967
      ],
      [],
      []
    ],
    "members": [
      967
    ]
  },
  "968": {
    "chainId": 507,
    "baseDex": 968,
    "name": "Orthworm",
    "type": "single",
    "maxStage": 1,
    "maxBst": 480,
    "baseRarity": 3,
    "stages": [
      [
        968
      ],
      [],
      []
    ],
    "members": [
      968
    ]
  },
  "969": {
    "chainId": 508,
    "baseDex": 969,
    "name": "Glimmet",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 525,
    "baseRarity": 4,
    "stages": [
      [
        969
      ],
      [
        970
      ],
      []
    ],
    "members": [
      969,
      970
    ]
  },
  "971": {
    "chainId": 509,
    "baseDex": 971,
    "name": "Greavard",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 488,
    "baseRarity": 3,
    "stages": [
      [
        971
      ],
      [
        972
      ],
      []
    ],
    "members": [
      971,
      972
    ]
  },
  "974": {
    "chainId": 511,
    "baseDex": 974,
    "name": "Cetoddle",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 521,
    "baseRarity": 4,
    "stages": [
      [
        974
      ],
      [
        975
      ],
      []
    ],
    "members": [
      974,
      975
    ]
  },
  "976": {
    "chainId": 512,
    "baseDex": 976,
    "name": "Veluza",
    "type": "single",
    "maxStage": 1,
    "maxBst": 478,
    "baseRarity": 3,
    "stages": [
      [
        976
      ],
      [],
      []
    ],
    "members": [
      976
    ]
  },
  "977": {
    "chainId": 513,
    "baseDex": 977,
    "name": "Dondozo",
    "type": "single",
    "maxStage": 1,
    "maxBst": 530,
    "baseRarity": 4,
    "stages": [
      [
        977
      ],
      [],
      []
    ],
    "members": [
      977
    ]
  },
  "978": {
    "chainId": 514,
    "baseDex": 978,
    "name": "Tatsugiri",
    "type": "single",
    "maxStage": 1,
    "maxBst": 475,
    "baseRarity": 3,
    "stages": [
      [
        978
      ],
      [],
      []
    ],
    "members": [
      978
    ]
  },
  "984": {
    "chainId": 515,
    "baseDex": 984,
    "name": "Colmilargo",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 4,
    "stages": [
      [
        984
      ],
      [],
      []
    ],
    "members": [
      984
    ]
  },
  "985": {
    "chainId": 516,
    "baseDex": 985,
    "name": "Colagrito",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 4,
    "stages": [
      [
        985
      ],
      [],
      []
    ],
    "members": [
      985
    ]
  },
  "987": {
    "chainId": 518,
    "baseDex": 987,
    "name": "Melenaleteo",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 4,
    "stages": [
      [
        987
      ],
      [],
      []
    ],
    "members": [
      987
    ]
  },
  "988": {
    "chainId": 519,
    "baseDex": 988,
    "name": "Reptalada",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 4,
    "stages": [
      [
        988
      ],
      [],
      []
    ],
    "members": [
      988
    ]
  },
  "989": {
    "chainId": 520,
    "baseDex": 989,
    "name": "Pelarena",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 4,
    "stages": [
      [
        989
      ],
      [],
      []
    ],
    "members": [
      989
    ]
  },
  "991": {
    "chainId": 522,
    "baseDex": 991,
    "name": "Ferrosaco",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 4,
    "stages": [
      [
        991
      ],
      [],
      []
    ],
    "members": [
      991
    ]
  },
  "992": {
    "chainId": 523,
    "baseDex": 992,
    "name": "Ferropalmas",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 4,
    "stages": [
      [
        992
      ],
      [],
      []
    ],
    "members": [
      992
    ]
  },
  "994": {
    "chainId": 525,
    "baseDex": 994,
    "name": "Ferropolilla",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 4,
    "stages": [
      [
        994
      ],
      [],
      []
    ],
    "members": [
      994
    ]
  },
  "995": {
    "chainId": 526,
    "baseDex": 995,
    "name": "Ferropúas",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 4,
    "stages": [
      [
        995
      ],
      [],
      []
    ],
    "members": [
      995
    ]
  },
  "996": {
    "chainId": 527,
    "baseDex": 996,
    "name": "Frigibax",
    "type": "3stage",
    "maxStage": 3,
    "maxBst": 600,
    "baseRarity": 5,
    "stages": [
      [
        996
      ],
      [
        997
      ],
      [
        998
      ]
    ],
    "members": [
      996,
      997,
      998
    ]
  },
  "999": {
    "chainId": 528,
    "baseDex": 999,
    "name": "Gimmighoul",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 550,
    "baseRarity": 4,
    "stages": [
      [
        999
      ],
      [
        1000
      ],
      []
    ],
    "members": [
      999,
      1000
    ]
  },
  "1004": {
    "chainId": 532,
    "baseDex": 1004,
    "name": "Chi-Yu",
    "type": "single",
    "maxStage": 1,
    "maxBst": 570,
    "baseRarity": 5,
    "stages": [
      [
        1004
      ],
      [],
      []
    ],
    "members": [
      1004
    ]
  },
  "1005": {
    "chainId": 533,
    "baseDex": 1005,
    "name": "Bramaluna",
    "type": "single",
    "maxStage": 1,
    "maxBst": 590,
    "baseRarity": 5,
    "stages": [
      [
        1005
      ],
      [],
      []
    ],
    "members": [
      1005
    ]
  },
  "1006": {
    "chainId": 534,
    "baseDex": 1006,
    "name": "Ferropaladín",
    "type": "single",
    "maxStage": 1,
    "maxBst": 590,
    "baseRarity": 5,
    "stages": [
      [
        1006
      ],
      [],
      []
    ],
    "members": [
      1006
    ]
  },
  "1007": {
    "chainId": 535,
    "baseDex": 1007,
    "name": "Koraidon",
    "type": "single",
    "maxStage": 1,
    "maxBst": 670,
    "baseRarity": 5,
    "stages": [
      [
        1007
      ],
      [],
      []
    ],
    "members": [
      1007
    ]
  },
  "1009": {
    "chainId": 537,
    "baseDex": 1009,
    "name": "Ondulagua",
    "type": "single",
    "maxStage": 1,
    "maxBst": 590,
    "baseRarity": 5,
    "stages": [
      [
        1009
      ],
      [],
      []
    ],
    "members": [
      1009
    ]
  },
  "1010": {
    "chainId": 538,
    "baseDex": 1010,
    "name": "Ferroverdor",
    "type": "single",
    "maxStage": 1,
    "maxBst": 590,
    "baseRarity": 5,
    "stages": [
      [
        1010
      ],
      [],
      []
    ],
    "members": [
      1010
    ]
  },
  "1012": {
    "chainId": 539,
    "baseDex": 1012,
    "name": "Poltchageist",
    "type": "2stage",
    "maxStage": 2,
    "maxBst": 508,
    "baseRarity": 4,
    "stages": [
      [
        1012
      ],
      [
        1013
      ],
      []
    ],
    "members": [
      1012,
      1013
    ]
  },
  "1015": {
    "chainId": 1001,
    "baseDex": 1015,
    "name": "Munkidori",
    "type": "single",
    "maxStage": 1,
    "maxBst": 555,
    "baseRarity": 5,
    "stages": [
      [
        1015
      ],
      [],
      []
    ],
    "members": [
      1015
    ]
  },
  "1016": {
    "chainId": 1002,
    "baseDex": 1016,
    "name": "Fezandipiti",
    "type": "single",
    "maxStage": 1,
    "maxBst": 555,
    "baseRarity": 5,
    "stages": [
      [
        1016
      ],
      [],
      []
    ],
    "members": [
      1016
    ]
  },
  "1017": {
    "chainId": 1003,
    "baseDex": 1017,
    "name": "Ogerpon",
    "type": "single",
    "maxStage": 1,
    "maxBst": 550,
    "baseRarity": 5,
    "stages": [
      [
        1017
      ],
      [],
      []
    ],
    "members": [
      1017
    ]
  },
  "1024": {
    "chainId": 1004,
    "baseDex": 1024,
    "name": "Terapagos",
    "type": "single",
    "maxStage": 1,
    "maxBst": 450,
    "baseRarity": 5,
    "stages": [
      [
        1024
      ],
      [],
      []
    ],
    "members": [
      1024
    ]
  }
};

G.EVO_BY_DEX = {
  "1": {
    "chainId": 1,
    "baseDex": 1,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      2
    ],
    "prev": null
  },
  "2": {
    "chainId": 1,
    "baseDex": 1,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      3
    ],
    "prev": 1
  },
  "3": {
    "chainId": 1,
    "baseDex": 1,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 2
  },
  "4": {
    "chainId": 2,
    "baseDex": 4,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      5
    ],
    "prev": null
  },
  "5": {
    "chainId": 2,
    "baseDex": 4,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      6
    ],
    "prev": 4
  },
  "6": {
    "chainId": 2,
    "baseDex": 4,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 5
  },
  "7": {
    "chainId": 3,
    "baseDex": 7,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      8
    ],
    "prev": null
  },
  "8": {
    "chainId": 3,
    "baseDex": 7,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      9
    ],
    "prev": 7
  },
  "9": {
    "chainId": 3,
    "baseDex": 7,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 8
  },
  "10": {
    "chainId": 4,
    "baseDex": 10,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      11
    ],
    "prev": null
  },
  "11": {
    "chainId": 4,
    "baseDex": 10,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      12
    ],
    "prev": 10
  },
  "12": {
    "chainId": 4,
    "baseDex": 10,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 11
  },
  "13": {
    "chainId": 5,
    "baseDex": 13,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      14
    ],
    "prev": null
  },
  "14": {
    "chainId": 5,
    "baseDex": 13,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      15
    ],
    "prev": 13
  },
  "15": {
    "chainId": 5,
    "baseDex": 13,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 14
  },
  "16": {
    "chainId": 6,
    "baseDex": 16,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      17
    ],
    "prev": null
  },
  "17": {
    "chainId": 6,
    "baseDex": 16,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      18
    ],
    "prev": 16
  },
  "18": {
    "chainId": 6,
    "baseDex": 16,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 17
  },
  "19": {
    "chainId": 7,
    "baseDex": 19,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      20
    ],
    "prev": null
  },
  "20": {
    "chainId": 7,
    "baseDex": 19,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 19
  },
  "21": {
    "chainId": 8,
    "baseDex": 21,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      22
    ],
    "prev": null
  },
  "22": {
    "chainId": 8,
    "baseDex": 21,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 21
  },
  "23": {
    "chainId": 9,
    "baseDex": 23,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      24
    ],
    "prev": null
  },
  "24": {
    "chainId": 9,
    "baseDex": 23,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 23
  },
  "172": {
    "chainId": 10,
    "baseDex": 172,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      25
    ],
    "prev": null
  },
  "25": {
    "chainId": 10,
    "baseDex": 172,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      26
    ],
    "prev": 172
  },
  "26": {
    "chainId": 10,
    "baseDex": 172,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 25
  },
  "27": {
    "chainId": 11,
    "baseDex": 27,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      28
    ],
    "prev": null
  },
  "28": {
    "chainId": 11,
    "baseDex": 27,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 27
  },
  "29": {
    "chainId": 12,
    "baseDex": 29,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      30
    ],
    "prev": null
  },
  "30": {
    "chainId": 12,
    "baseDex": 29,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      31
    ],
    "prev": 29
  },
  "31": {
    "chainId": 12,
    "baseDex": 29,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 30
  },
  "32": {
    "chainId": 13,
    "baseDex": 32,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      33
    ],
    "prev": null
  },
  "33": {
    "chainId": 13,
    "baseDex": 32,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      34
    ],
    "prev": 32
  },
  "34": {
    "chainId": 13,
    "baseDex": 32,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 33
  },
  "173": {
    "chainId": 14,
    "baseDex": 173,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      35
    ],
    "prev": null
  },
  "35": {
    "chainId": 14,
    "baseDex": 173,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      36
    ],
    "prev": 173
  },
  "36": {
    "chainId": 14,
    "baseDex": 173,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 35
  },
  "37": {
    "chainId": 15,
    "baseDex": 37,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      38
    ],
    "prev": null
  },
  "38": {
    "chainId": 15,
    "baseDex": 37,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 37
  },
  "174": {
    "chainId": 16,
    "baseDex": 174,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      39
    ],
    "prev": null
  },
  "39": {
    "chainId": 16,
    "baseDex": 174,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      40
    ],
    "prev": 174
  },
  "40": {
    "chainId": 16,
    "baseDex": 174,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 39
  },
  "41": {
    "chainId": 17,
    "baseDex": 41,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      42
    ],
    "prev": null
  },
  "42": {
    "chainId": 17,
    "baseDex": 41,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      169
    ],
    "prev": 41
  },
  "169": {
    "chainId": 17,
    "baseDex": 41,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 42
  },
  "43": {
    "chainId": 18,
    "baseDex": 43,
    "stage": 1,
    "type": "branch",
    "maxStage": 3,
    "next": [
      44
    ],
    "prev": null
  },
  "44": {
    "chainId": 18,
    "baseDex": 43,
    "stage": 2,
    "type": "branch",
    "maxStage": 3,
    "next": [
      45,
      182
    ],
    "prev": 43
  },
  "45": {
    "chainId": 18,
    "baseDex": 43,
    "stage": 3,
    "type": "branch",
    "maxStage": 3,
    "next": [],
    "prev": 44
  },
  "182": {
    "chainId": 18,
    "baseDex": 43,
    "stage": 3,
    "type": "branch",
    "maxStage": 3,
    "next": [],
    "prev": 44
  },
  "46": {
    "chainId": 19,
    "baseDex": 46,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      47
    ],
    "prev": null
  },
  "47": {
    "chainId": 19,
    "baseDex": 46,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 46
  },
  "48": {
    "chainId": 20,
    "baseDex": 48,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      49
    ],
    "prev": null
  },
  "49": {
    "chainId": 20,
    "baseDex": 48,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 48
  },
  "50": {
    "chainId": 21,
    "baseDex": 50,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      51
    ],
    "prev": null
  },
  "51": {
    "chainId": 21,
    "baseDex": 50,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 50
  },
  "52": {
    "chainId": 22,
    "baseDex": 52,
    "stage": 1,
    "type": "branch",
    "maxStage": 2,
    "next": [
      53,
      863
    ],
    "prev": null
  },
  "53": {
    "chainId": 22,
    "baseDex": 52,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 52
  },
  "863": {
    "chainId": 22,
    "baseDex": 52,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 52
  },
  "54": {
    "chainId": 23,
    "baseDex": 54,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      55
    ],
    "prev": null
  },
  "55": {
    "chainId": 23,
    "baseDex": 54,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 54
  },
  "56": {
    "chainId": 24,
    "baseDex": 56,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      57
    ],
    "prev": null
  },
  "57": {
    "chainId": 24,
    "baseDex": 56,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      979
    ],
    "prev": 56
  },
  "979": {
    "chainId": 24,
    "baseDex": 56,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 57
  },
  "58": {
    "chainId": 25,
    "baseDex": 58,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      59
    ],
    "prev": null
  },
  "59": {
    "chainId": 25,
    "baseDex": 58,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 58
  },
  "60": {
    "chainId": 26,
    "baseDex": 60,
    "stage": 1,
    "type": "branch",
    "maxStage": 3,
    "next": [
      61
    ],
    "prev": null
  },
  "61": {
    "chainId": 26,
    "baseDex": 60,
    "stage": 2,
    "type": "branch",
    "maxStage": 3,
    "next": [
      62,
      186
    ],
    "prev": 60
  },
  "62": {
    "chainId": 26,
    "baseDex": 60,
    "stage": 3,
    "type": "branch",
    "maxStage": 3,
    "next": [],
    "prev": 61
  },
  "186": {
    "chainId": 26,
    "baseDex": 60,
    "stage": 3,
    "type": "branch",
    "maxStage": 3,
    "next": [],
    "prev": 61
  },
  "63": {
    "chainId": 27,
    "baseDex": 63,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      64
    ],
    "prev": null
  },
  "64": {
    "chainId": 27,
    "baseDex": 63,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      65
    ],
    "prev": 63
  },
  "65": {
    "chainId": 27,
    "baseDex": 63,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 64
  },
  "66": {
    "chainId": 28,
    "baseDex": 66,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      67
    ],
    "prev": null
  },
  "67": {
    "chainId": 28,
    "baseDex": 66,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      68
    ],
    "prev": 66
  },
  "68": {
    "chainId": 28,
    "baseDex": 66,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 67
  },
  "69": {
    "chainId": 29,
    "baseDex": 69,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      70
    ],
    "prev": null
  },
  "70": {
    "chainId": 29,
    "baseDex": 69,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      71
    ],
    "prev": 69
  },
  "71": {
    "chainId": 29,
    "baseDex": 69,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 70
  },
  "72": {
    "chainId": 30,
    "baseDex": 72,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      73
    ],
    "prev": null
  },
  "73": {
    "chainId": 30,
    "baseDex": 72,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 72
  },
  "74": {
    "chainId": 31,
    "baseDex": 74,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      75
    ],
    "prev": null
  },
  "75": {
    "chainId": 31,
    "baseDex": 74,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      76
    ],
    "prev": 74
  },
  "76": {
    "chainId": 31,
    "baseDex": 74,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 75
  },
  "77": {
    "chainId": 32,
    "baseDex": 77,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      78
    ],
    "prev": null
  },
  "78": {
    "chainId": 32,
    "baseDex": 77,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 77
  },
  "79": {
    "chainId": 33,
    "baseDex": 79,
    "stage": 1,
    "type": "branch",
    "maxStage": 2,
    "next": [
      80,
      199
    ],
    "prev": null
  },
  "80": {
    "chainId": 33,
    "baseDex": 79,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 79
  },
  "199": {
    "chainId": 33,
    "baseDex": 79,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 79
  },
  "81": {
    "chainId": 34,
    "baseDex": 81,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      82
    ],
    "prev": null
  },
  "82": {
    "chainId": 34,
    "baseDex": 81,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      462
    ],
    "prev": 81
  },
  "462": {
    "chainId": 34,
    "baseDex": 81,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 82
  },
  "83": {
    "chainId": 35,
    "baseDex": 83,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      865
    ],
    "prev": null
  },
  "865": {
    "chainId": 35,
    "baseDex": 83,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 83
  },
  "84": {
    "chainId": 36,
    "baseDex": 84,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      85
    ],
    "prev": null
  },
  "85": {
    "chainId": 36,
    "baseDex": 84,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 84
  },
  "86": {
    "chainId": 37,
    "baseDex": 86,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      87
    ],
    "prev": null
  },
  "87": {
    "chainId": 37,
    "baseDex": 86,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 86
  },
  "88": {
    "chainId": 38,
    "baseDex": 88,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      89
    ],
    "prev": null
  },
  "89": {
    "chainId": 38,
    "baseDex": 88,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 88
  },
  "90": {
    "chainId": 39,
    "baseDex": 90,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      91
    ],
    "prev": null
  },
  "91": {
    "chainId": 39,
    "baseDex": 90,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 90
  },
  "92": {
    "chainId": 40,
    "baseDex": 92,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      93
    ],
    "prev": null
  },
  "93": {
    "chainId": 40,
    "baseDex": 92,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      94
    ],
    "prev": 92
  },
  "94": {
    "chainId": 40,
    "baseDex": 92,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 93
  },
  "95": {
    "chainId": 41,
    "baseDex": 95,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      208
    ],
    "prev": null
  },
  "208": {
    "chainId": 41,
    "baseDex": 95,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 95
  },
  "96": {
    "chainId": 42,
    "baseDex": 96,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      97
    ],
    "prev": null
  },
  "97": {
    "chainId": 42,
    "baseDex": 96,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 96
  },
  "98": {
    "chainId": 43,
    "baseDex": 98,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      99
    ],
    "prev": null
  },
  "99": {
    "chainId": 43,
    "baseDex": 98,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 98
  },
  "100": {
    "chainId": 44,
    "baseDex": 100,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      101
    ],
    "prev": null
  },
  "101": {
    "chainId": 44,
    "baseDex": 100,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 100
  },
  "102": {
    "chainId": 45,
    "baseDex": 102,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      103
    ],
    "prev": null
  },
  "103": {
    "chainId": 45,
    "baseDex": 102,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 102
  },
  "104": {
    "chainId": 46,
    "baseDex": 104,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      105
    ],
    "prev": null
  },
  "105": {
    "chainId": 46,
    "baseDex": 104,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 104
  },
  "236": {
    "chainId": 47,
    "baseDex": 236,
    "stage": 1,
    "type": "branch",
    "maxStage": 2,
    "next": [
      106,
      107,
      237
    ],
    "prev": null
  },
  "106": {
    "chainId": 47,
    "baseDex": 236,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 236
  },
  "107": {
    "chainId": 47,
    "baseDex": 236,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 236
  },
  "237": {
    "chainId": 47,
    "baseDex": 236,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 236
  },
  "108": {
    "chainId": 48,
    "baseDex": 108,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      463
    ],
    "prev": null
  },
  "463": {
    "chainId": 48,
    "baseDex": 108,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 108
  },
  "109": {
    "chainId": 49,
    "baseDex": 109,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      110
    ],
    "prev": null
  },
  "110": {
    "chainId": 49,
    "baseDex": 109,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 109
  },
  "111": {
    "chainId": 50,
    "baseDex": 111,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      112
    ],
    "prev": null
  },
  "112": {
    "chainId": 50,
    "baseDex": 111,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      464
    ],
    "prev": 111
  },
  "464": {
    "chainId": 50,
    "baseDex": 111,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 112
  },
  "440": {
    "chainId": 51,
    "baseDex": 440,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      113
    ],
    "prev": null
  },
  "113": {
    "chainId": 51,
    "baseDex": 440,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      242
    ],
    "prev": 440
  },
  "242": {
    "chainId": 51,
    "baseDex": 440,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 113
  },
  "114": {
    "chainId": 52,
    "baseDex": 114,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      465
    ],
    "prev": null
  },
  "465": {
    "chainId": 52,
    "baseDex": 114,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 114
  },
  "115": {
    "chainId": 53,
    "baseDex": 115,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "116": {
    "chainId": 54,
    "baseDex": 116,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      117
    ],
    "prev": null
  },
  "117": {
    "chainId": 54,
    "baseDex": 116,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      230
    ],
    "prev": 116
  },
  "230": {
    "chainId": 54,
    "baseDex": 116,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 117
  },
  "118": {
    "chainId": 55,
    "baseDex": 118,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      119
    ],
    "prev": null
  },
  "119": {
    "chainId": 55,
    "baseDex": 118,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 118
  },
  "120": {
    "chainId": 56,
    "baseDex": 120,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      121
    ],
    "prev": null
  },
  "121": {
    "chainId": 56,
    "baseDex": 120,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 120
  },
  "439": {
    "chainId": 57,
    "baseDex": 439,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      122
    ],
    "prev": null
  },
  "122": {
    "chainId": 57,
    "baseDex": 439,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      866
    ],
    "prev": 439
  },
  "866": {
    "chainId": 57,
    "baseDex": 439,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 122
  },
  "123": {
    "chainId": 58,
    "baseDex": 123,
    "stage": 1,
    "type": "branch",
    "maxStage": 2,
    "next": [
      212,
      900
    ],
    "prev": null
  },
  "212": {
    "chainId": 58,
    "baseDex": 123,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 123
  },
  "900": {
    "chainId": 58,
    "baseDex": 123,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 123
  },
  "238": {
    "chainId": 59,
    "baseDex": 238,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      124
    ],
    "prev": null
  },
  "124": {
    "chainId": 59,
    "baseDex": 238,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 238
  },
  "239": {
    "chainId": 60,
    "baseDex": 239,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      125
    ],
    "prev": null
  },
  "125": {
    "chainId": 60,
    "baseDex": 239,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      466
    ],
    "prev": 239
  },
  "466": {
    "chainId": 60,
    "baseDex": 239,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 125
  },
  "240": {
    "chainId": 61,
    "baseDex": 240,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      126
    ],
    "prev": null
  },
  "126": {
    "chainId": 61,
    "baseDex": 240,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      467
    ],
    "prev": 240
  },
  "467": {
    "chainId": 61,
    "baseDex": 240,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 126
  },
  "127": {
    "chainId": 62,
    "baseDex": 127,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "128": {
    "chainId": 63,
    "baseDex": 128,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "129": {
    "chainId": 64,
    "baseDex": 129,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      130
    ],
    "prev": null
  },
  "130": {
    "chainId": 64,
    "baseDex": 129,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 129
  },
  "131": {
    "chainId": 65,
    "baseDex": 131,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "132": {
    "chainId": 66,
    "baseDex": 132,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "133": {
    "chainId": 67,
    "baseDex": 133,
    "stage": 1,
    "type": "branch",
    "maxStage": 2,
    "next": [
      134,
      135,
      136,
      196,
      197,
      470,
      471,
      700
    ],
    "prev": null
  },
  "134": {
    "chainId": 67,
    "baseDex": 133,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 133
  },
  "135": {
    "chainId": 67,
    "baseDex": 133,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 133
  },
  "136": {
    "chainId": 67,
    "baseDex": 133,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 133
  },
  "196": {
    "chainId": 67,
    "baseDex": 133,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 133
  },
  "197": {
    "chainId": 67,
    "baseDex": 133,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 133
  },
  "470": {
    "chainId": 67,
    "baseDex": 133,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 133
  },
  "471": {
    "chainId": 67,
    "baseDex": 133,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 133
  },
  "700": {
    "chainId": 67,
    "baseDex": 133,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 133
  },
  "137": {
    "chainId": 68,
    "baseDex": 137,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      233
    ],
    "prev": null
  },
  "233": {
    "chainId": 68,
    "baseDex": 137,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      474
    ],
    "prev": 137
  },
  "474": {
    "chainId": 68,
    "baseDex": 137,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 233
  },
  "138": {
    "chainId": 69,
    "baseDex": 138,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      139
    ],
    "prev": null
  },
  "139": {
    "chainId": 69,
    "baseDex": 138,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 138
  },
  "140": {
    "chainId": 70,
    "baseDex": 140,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      141
    ],
    "prev": null
  },
  "141": {
    "chainId": 70,
    "baseDex": 140,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 140
  },
  "142": {
    "chainId": 71,
    "baseDex": 142,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "446": {
    "chainId": 72,
    "baseDex": 446,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      143
    ],
    "prev": null
  },
  "143": {
    "chainId": 72,
    "baseDex": 446,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 446
  },
  "144": {
    "chainId": 73,
    "baseDex": 144,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "145": {
    "chainId": 74,
    "baseDex": 145,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "146": {
    "chainId": 75,
    "baseDex": 146,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "147": {
    "chainId": 76,
    "baseDex": 147,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      148
    ],
    "prev": null
  },
  "148": {
    "chainId": 76,
    "baseDex": 147,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      149
    ],
    "prev": 147
  },
  "149": {
    "chainId": 76,
    "baseDex": 147,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 148
  },
  "150": {
    "chainId": 77,
    "baseDex": 150,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "151": {
    "chainId": 78,
    "baseDex": 151,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "152": {
    "chainId": 79,
    "baseDex": 152,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      153
    ],
    "prev": null
  },
  "153": {
    "chainId": 79,
    "baseDex": 152,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      154
    ],
    "prev": 152
  },
  "154": {
    "chainId": 79,
    "baseDex": 152,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 153
  },
  "155": {
    "chainId": 80,
    "baseDex": 155,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      156
    ],
    "prev": null
  },
  "156": {
    "chainId": 80,
    "baseDex": 155,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      157
    ],
    "prev": 155
  },
  "157": {
    "chainId": 80,
    "baseDex": 155,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 156
  },
  "158": {
    "chainId": 81,
    "baseDex": 158,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      159
    ],
    "prev": null
  },
  "159": {
    "chainId": 81,
    "baseDex": 158,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      160
    ],
    "prev": 158
  },
  "160": {
    "chainId": 81,
    "baseDex": 158,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 159
  },
  "161": {
    "chainId": 82,
    "baseDex": 161,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      162
    ],
    "prev": null
  },
  "162": {
    "chainId": 82,
    "baseDex": 161,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 161
  },
  "163": {
    "chainId": 83,
    "baseDex": 163,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      164
    ],
    "prev": null
  },
  "164": {
    "chainId": 83,
    "baseDex": 163,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 163
  },
  "165": {
    "chainId": 84,
    "baseDex": 165,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      166
    ],
    "prev": null
  },
  "166": {
    "chainId": 84,
    "baseDex": 165,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 165
  },
  "167": {
    "chainId": 85,
    "baseDex": 167,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      168
    ],
    "prev": null
  },
  "168": {
    "chainId": 85,
    "baseDex": 167,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 167
  },
  "170": {
    "chainId": 86,
    "baseDex": 170,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      171
    ],
    "prev": null
  },
  "171": {
    "chainId": 86,
    "baseDex": 170,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 170
  },
  "175": {
    "chainId": 87,
    "baseDex": 175,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      176
    ],
    "prev": null
  },
  "176": {
    "chainId": 87,
    "baseDex": 175,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      468
    ],
    "prev": 175
  },
  "468": {
    "chainId": 87,
    "baseDex": 175,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 176
  },
  "177": {
    "chainId": 88,
    "baseDex": 177,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      178
    ],
    "prev": null
  },
  "178": {
    "chainId": 88,
    "baseDex": 177,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 177
  },
  "179": {
    "chainId": 89,
    "baseDex": 179,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      180
    ],
    "prev": null
  },
  "180": {
    "chainId": 89,
    "baseDex": 179,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      181
    ],
    "prev": 179
  },
  "181": {
    "chainId": 89,
    "baseDex": 179,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 180
  },
  "298": {
    "chainId": 90,
    "baseDex": 298,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      183
    ],
    "prev": null
  },
  "183": {
    "chainId": 90,
    "baseDex": 298,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      184
    ],
    "prev": 298
  },
  "184": {
    "chainId": 90,
    "baseDex": 298,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 183
  },
  "438": {
    "chainId": 91,
    "baseDex": 438,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      185
    ],
    "prev": null
  },
  "185": {
    "chainId": 91,
    "baseDex": 438,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 438
  },
  "187": {
    "chainId": 92,
    "baseDex": 187,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      188
    ],
    "prev": null
  },
  "188": {
    "chainId": 92,
    "baseDex": 187,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      189
    ],
    "prev": 187
  },
  "189": {
    "chainId": 92,
    "baseDex": 187,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 188
  },
  "190": {
    "chainId": 93,
    "baseDex": 190,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      424
    ],
    "prev": null
  },
  "424": {
    "chainId": 93,
    "baseDex": 190,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 190
  },
  "191": {
    "chainId": 94,
    "baseDex": 191,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      192
    ],
    "prev": null
  },
  "192": {
    "chainId": 94,
    "baseDex": 191,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 191
  },
  "193": {
    "chainId": 95,
    "baseDex": 193,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      469
    ],
    "prev": null
  },
  "469": {
    "chainId": 95,
    "baseDex": 193,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 193
  },
  "194": {
    "chainId": 96,
    "baseDex": 194,
    "stage": 1,
    "type": "branch",
    "maxStage": 2,
    "next": [
      195,
      980
    ],
    "prev": null
  },
  "195": {
    "chainId": 96,
    "baseDex": 194,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 194
  },
  "980": {
    "chainId": 96,
    "baseDex": 194,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 194
  },
  "198": {
    "chainId": 97,
    "baseDex": 198,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      430
    ],
    "prev": null
  },
  "430": {
    "chainId": 97,
    "baseDex": 198,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 198
  },
  "200": {
    "chainId": 98,
    "baseDex": 200,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      429
    ],
    "prev": null
  },
  "429": {
    "chainId": 98,
    "baseDex": 200,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 200
  },
  "201": {
    "chainId": 99,
    "baseDex": 201,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "360": {
    "chainId": 100,
    "baseDex": 360,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      202
    ],
    "prev": null
  },
  "202": {
    "chainId": 100,
    "baseDex": 360,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 360
  },
  "203": {
    "chainId": 101,
    "baseDex": 203,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      981
    ],
    "prev": null
  },
  "981": {
    "chainId": 101,
    "baseDex": 203,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 203
  },
  "204": {
    "chainId": 102,
    "baseDex": 204,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      205
    ],
    "prev": null
  },
  "205": {
    "chainId": 102,
    "baseDex": 204,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 204
  },
  "206": {
    "chainId": 103,
    "baseDex": 206,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      982
    ],
    "prev": null
  },
  "982": {
    "chainId": 103,
    "baseDex": 206,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 206
  },
  "207": {
    "chainId": 104,
    "baseDex": 207,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      472
    ],
    "prev": null
  },
  "472": {
    "chainId": 104,
    "baseDex": 207,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 207
  },
  "209": {
    "chainId": 105,
    "baseDex": 209,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      210
    ],
    "prev": null
  },
  "210": {
    "chainId": 105,
    "baseDex": 209,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 209
  },
  "211": {
    "chainId": 106,
    "baseDex": 211,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      904
    ],
    "prev": null
  },
  "904": {
    "chainId": 106,
    "baseDex": 211,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 211
  },
  "213": {
    "chainId": 107,
    "baseDex": 213,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "214": {
    "chainId": 108,
    "baseDex": 214,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "215": {
    "chainId": 109,
    "baseDex": 215,
    "stage": 1,
    "type": "branch",
    "maxStage": 2,
    "next": [
      461,
      903
    ],
    "prev": null
  },
  "461": {
    "chainId": 109,
    "baseDex": 215,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 215
  },
  "903": {
    "chainId": 109,
    "baseDex": 215,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 215
  },
  "216": {
    "chainId": 110,
    "baseDex": 216,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      217
    ],
    "prev": null
  },
  "217": {
    "chainId": 110,
    "baseDex": 216,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      901
    ],
    "prev": 216
  },
  "901": {
    "chainId": 110,
    "baseDex": 216,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 217
  },
  "218": {
    "chainId": 111,
    "baseDex": 218,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      219
    ],
    "prev": null
  },
  "219": {
    "chainId": 111,
    "baseDex": 218,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 218
  },
  "220": {
    "chainId": 112,
    "baseDex": 220,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      221
    ],
    "prev": null
  },
  "221": {
    "chainId": 112,
    "baseDex": 220,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      473
    ],
    "prev": 220
  },
  "473": {
    "chainId": 112,
    "baseDex": 220,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 221
  },
  "222": {
    "chainId": 113,
    "baseDex": 222,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      864
    ],
    "prev": null
  },
  "864": {
    "chainId": 113,
    "baseDex": 222,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 222
  },
  "223": {
    "chainId": 114,
    "baseDex": 223,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      224
    ],
    "prev": null
  },
  "224": {
    "chainId": 114,
    "baseDex": 223,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 223
  },
  "225": {
    "chainId": 115,
    "baseDex": 225,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "458": {
    "chainId": 116,
    "baseDex": 458,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      226
    ],
    "prev": null
  },
  "226": {
    "chainId": 116,
    "baseDex": 458,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 458
  },
  "227": {
    "chainId": 117,
    "baseDex": 227,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "228": {
    "chainId": 118,
    "baseDex": 228,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      229
    ],
    "prev": null
  },
  "229": {
    "chainId": 118,
    "baseDex": 228,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 228
  },
  "231": {
    "chainId": 119,
    "baseDex": 231,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      232
    ],
    "prev": null
  },
  "232": {
    "chainId": 119,
    "baseDex": 231,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 231
  },
  "234": {
    "chainId": 120,
    "baseDex": 234,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      899
    ],
    "prev": null
  },
  "899": {
    "chainId": 120,
    "baseDex": 234,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 234
  },
  "235": {
    "chainId": 121,
    "baseDex": 235,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "241": {
    "chainId": 122,
    "baseDex": 241,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "243": {
    "chainId": 123,
    "baseDex": 243,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "244": {
    "chainId": 124,
    "baseDex": 244,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "245": {
    "chainId": 125,
    "baseDex": 245,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "246": {
    "chainId": 126,
    "baseDex": 246,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      247
    ],
    "prev": null
  },
  "247": {
    "chainId": 126,
    "baseDex": 246,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      248
    ],
    "prev": 246
  },
  "248": {
    "chainId": 126,
    "baseDex": 246,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 247
  },
  "249": {
    "chainId": 127,
    "baseDex": 249,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "250": {
    "chainId": 128,
    "baseDex": 250,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "251": {
    "chainId": 129,
    "baseDex": 251,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "252": {
    "chainId": 130,
    "baseDex": 252,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      253
    ],
    "prev": null
  },
  "253": {
    "chainId": 130,
    "baseDex": 252,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      254
    ],
    "prev": 252
  },
  "254": {
    "chainId": 130,
    "baseDex": 252,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 253
  },
  "255": {
    "chainId": 131,
    "baseDex": 255,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      256
    ],
    "prev": null
  },
  "256": {
    "chainId": 131,
    "baseDex": 255,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      257
    ],
    "prev": 255
  },
  "257": {
    "chainId": 131,
    "baseDex": 255,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 256
  },
  "258": {
    "chainId": 132,
    "baseDex": 258,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      259
    ],
    "prev": null
  },
  "259": {
    "chainId": 132,
    "baseDex": 258,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      260
    ],
    "prev": 258
  },
  "260": {
    "chainId": 132,
    "baseDex": 258,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 259
  },
  "261": {
    "chainId": 133,
    "baseDex": 261,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      262
    ],
    "prev": null
  },
  "262": {
    "chainId": 133,
    "baseDex": 261,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 261
  },
  "263": {
    "chainId": 134,
    "baseDex": 263,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      264
    ],
    "prev": null
  },
  "264": {
    "chainId": 134,
    "baseDex": 263,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      862
    ],
    "prev": 263
  },
  "862": {
    "chainId": 134,
    "baseDex": 263,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 264
  },
  "265": {
    "chainId": 135,
    "baseDex": 265,
    "stage": 1,
    "type": "branch",
    "maxStage": 3,
    "next": [
      266,
      268
    ],
    "prev": null
  },
  "266": {
    "chainId": 135,
    "baseDex": 265,
    "stage": 2,
    "type": "branch",
    "maxStage": 3,
    "next": [
      267
    ],
    "prev": 265
  },
  "267": {
    "chainId": 135,
    "baseDex": 265,
    "stage": 3,
    "type": "branch",
    "maxStage": 3,
    "next": [],
    "prev": 266
  },
  "268": {
    "chainId": 135,
    "baseDex": 265,
    "stage": 2,
    "type": "branch",
    "maxStage": 3,
    "next": [
      269
    ],
    "prev": 265
  },
  "269": {
    "chainId": 135,
    "baseDex": 265,
    "stage": 3,
    "type": "branch",
    "maxStage": 3,
    "next": [],
    "prev": 268
  },
  "270": {
    "chainId": 136,
    "baseDex": 270,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      271
    ],
    "prev": null
  },
  "271": {
    "chainId": 136,
    "baseDex": 270,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      272
    ],
    "prev": 270
  },
  "272": {
    "chainId": 136,
    "baseDex": 270,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 271
  },
  "273": {
    "chainId": 137,
    "baseDex": 273,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      274
    ],
    "prev": null
  },
  "274": {
    "chainId": 137,
    "baseDex": 273,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      275
    ],
    "prev": 273
  },
  "275": {
    "chainId": 137,
    "baseDex": 273,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 274
  },
  "276": {
    "chainId": 138,
    "baseDex": 276,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      277
    ],
    "prev": null
  },
  "277": {
    "chainId": 138,
    "baseDex": 276,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 276
  },
  "278": {
    "chainId": 139,
    "baseDex": 278,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      279
    ],
    "prev": null
  },
  "279": {
    "chainId": 139,
    "baseDex": 278,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 278
  },
  "280": {
    "chainId": 140,
    "baseDex": 280,
    "stage": 1,
    "type": "branch",
    "maxStage": 3,
    "next": [
      281
    ],
    "prev": null
  },
  "281": {
    "chainId": 140,
    "baseDex": 280,
    "stage": 2,
    "type": "branch",
    "maxStage": 3,
    "next": [
      282,
      475
    ],
    "prev": 280
  },
  "282": {
    "chainId": 140,
    "baseDex": 280,
    "stage": 3,
    "type": "branch",
    "maxStage": 3,
    "next": [],
    "prev": 281
  },
  "475": {
    "chainId": 140,
    "baseDex": 280,
    "stage": 3,
    "type": "branch",
    "maxStage": 3,
    "next": [],
    "prev": 281
  },
  "283": {
    "chainId": 141,
    "baseDex": 283,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      284
    ],
    "prev": null
  },
  "284": {
    "chainId": 141,
    "baseDex": 283,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 283
  },
  "285": {
    "chainId": 142,
    "baseDex": 285,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      286
    ],
    "prev": null
  },
  "286": {
    "chainId": 142,
    "baseDex": 285,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 285
  },
  "287": {
    "chainId": 143,
    "baseDex": 287,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      288
    ],
    "prev": null
  },
  "288": {
    "chainId": 143,
    "baseDex": 287,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      289
    ],
    "prev": 287
  },
  "289": {
    "chainId": 143,
    "baseDex": 287,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 288
  },
  "290": {
    "chainId": 144,
    "baseDex": 290,
    "stage": 1,
    "type": "branch",
    "maxStage": 2,
    "next": [
      291,
      292
    ],
    "prev": null
  },
  "291": {
    "chainId": 144,
    "baseDex": 290,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 290
  },
  "292": {
    "chainId": 144,
    "baseDex": 290,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 290
  },
  "293": {
    "chainId": 145,
    "baseDex": 293,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      294
    ],
    "prev": null
  },
  "294": {
    "chainId": 145,
    "baseDex": 293,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      295
    ],
    "prev": 293
  },
  "295": {
    "chainId": 145,
    "baseDex": 293,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 294
  },
  "296": {
    "chainId": 146,
    "baseDex": 296,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      297
    ],
    "prev": null
  },
  "297": {
    "chainId": 146,
    "baseDex": 296,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 296
  },
  "299": {
    "chainId": 147,
    "baseDex": 299,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      476
    ],
    "prev": null
  },
  "476": {
    "chainId": 147,
    "baseDex": 299,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 299
  },
  "300": {
    "chainId": 148,
    "baseDex": 300,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      301
    ],
    "prev": null
  },
  "301": {
    "chainId": 148,
    "baseDex": 300,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 300
  },
  "302": {
    "chainId": 149,
    "baseDex": 302,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "303": {
    "chainId": 150,
    "baseDex": 303,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "304": {
    "chainId": 151,
    "baseDex": 304,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      305
    ],
    "prev": null
  },
  "305": {
    "chainId": 151,
    "baseDex": 304,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      306
    ],
    "prev": 304
  },
  "306": {
    "chainId": 151,
    "baseDex": 304,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 305
  },
  "307": {
    "chainId": 152,
    "baseDex": 307,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      308
    ],
    "prev": null
  },
  "308": {
    "chainId": 152,
    "baseDex": 307,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 307
  },
  "309": {
    "chainId": 153,
    "baseDex": 309,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      310
    ],
    "prev": null
  },
  "310": {
    "chainId": 153,
    "baseDex": 309,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 309
  },
  "311": {
    "chainId": 154,
    "baseDex": 311,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "312": {
    "chainId": 155,
    "baseDex": 312,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "313": {
    "chainId": 156,
    "baseDex": 313,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "314": {
    "chainId": 157,
    "baseDex": 314,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "406": {
    "chainId": 158,
    "baseDex": 406,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      315
    ],
    "prev": null
  },
  "315": {
    "chainId": 158,
    "baseDex": 406,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      407
    ],
    "prev": 406
  },
  "407": {
    "chainId": 158,
    "baseDex": 406,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 315
  },
  "316": {
    "chainId": 159,
    "baseDex": 316,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      317
    ],
    "prev": null
  },
  "317": {
    "chainId": 159,
    "baseDex": 316,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 316
  },
  "318": {
    "chainId": 160,
    "baseDex": 318,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      319
    ],
    "prev": null
  },
  "319": {
    "chainId": 160,
    "baseDex": 318,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 318
  },
  "320": {
    "chainId": 161,
    "baseDex": 320,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      321
    ],
    "prev": null
  },
  "321": {
    "chainId": 161,
    "baseDex": 320,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 320
  },
  "322": {
    "chainId": 162,
    "baseDex": 322,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      323
    ],
    "prev": null
  },
  "323": {
    "chainId": 162,
    "baseDex": 322,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 322
  },
  "324": {
    "chainId": 163,
    "baseDex": 324,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "325": {
    "chainId": 164,
    "baseDex": 325,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      326
    ],
    "prev": null
  },
  "326": {
    "chainId": 164,
    "baseDex": 325,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 325
  },
  "327": {
    "chainId": 165,
    "baseDex": 327,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "328": {
    "chainId": 166,
    "baseDex": 328,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      329
    ],
    "prev": null
  },
  "329": {
    "chainId": 166,
    "baseDex": 328,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      330
    ],
    "prev": 328
  },
  "330": {
    "chainId": 166,
    "baseDex": 328,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 329
  },
  "331": {
    "chainId": 167,
    "baseDex": 331,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      332
    ],
    "prev": null
  },
  "332": {
    "chainId": 167,
    "baseDex": 331,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 331
  },
  "333": {
    "chainId": 168,
    "baseDex": 333,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      334
    ],
    "prev": null
  },
  "334": {
    "chainId": 168,
    "baseDex": 333,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 333
  },
  "335": {
    "chainId": 169,
    "baseDex": 335,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "336": {
    "chainId": 170,
    "baseDex": 336,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "337": {
    "chainId": 171,
    "baseDex": 337,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "338": {
    "chainId": 172,
    "baseDex": 338,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "339": {
    "chainId": 173,
    "baseDex": 339,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      340
    ],
    "prev": null
  },
  "340": {
    "chainId": 173,
    "baseDex": 339,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 339
  },
  "341": {
    "chainId": 174,
    "baseDex": 341,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      342
    ],
    "prev": null
  },
  "342": {
    "chainId": 174,
    "baseDex": 341,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 341
  },
  "343": {
    "chainId": 175,
    "baseDex": 343,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      344
    ],
    "prev": null
  },
  "344": {
    "chainId": 175,
    "baseDex": 343,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 343
  },
  "345": {
    "chainId": 176,
    "baseDex": 345,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      346
    ],
    "prev": null
  },
  "346": {
    "chainId": 176,
    "baseDex": 345,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 345
  },
  "347": {
    "chainId": 177,
    "baseDex": 347,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      348
    ],
    "prev": null
  },
  "348": {
    "chainId": 177,
    "baseDex": 347,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 347
  },
  "349": {
    "chainId": 178,
    "baseDex": 349,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      350
    ],
    "prev": null
  },
  "350": {
    "chainId": 178,
    "baseDex": 349,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 349
  },
  "351": {
    "chainId": 179,
    "baseDex": 351,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "352": {
    "chainId": 180,
    "baseDex": 352,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "353": {
    "chainId": 181,
    "baseDex": 353,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      354
    ],
    "prev": null
  },
  "354": {
    "chainId": 181,
    "baseDex": 353,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 353
  },
  "355": {
    "chainId": 182,
    "baseDex": 355,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      356
    ],
    "prev": null
  },
  "356": {
    "chainId": 182,
    "baseDex": 355,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      477
    ],
    "prev": 355
  },
  "477": {
    "chainId": 182,
    "baseDex": 355,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 356
  },
  "357": {
    "chainId": 183,
    "baseDex": 357,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "433": {
    "chainId": 184,
    "baseDex": 433,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      358
    ],
    "prev": null
  },
  "358": {
    "chainId": 184,
    "baseDex": 433,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 433
  },
  "359": {
    "chainId": 185,
    "baseDex": 359,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "361": {
    "chainId": 186,
    "baseDex": 361,
    "stage": 1,
    "type": "branch",
    "maxStage": 2,
    "next": [
      362,
      478
    ],
    "prev": null
  },
  "362": {
    "chainId": 186,
    "baseDex": 361,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 361
  },
  "478": {
    "chainId": 186,
    "baseDex": 361,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 361
  },
  "363": {
    "chainId": 187,
    "baseDex": 363,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      364
    ],
    "prev": null
  },
  "364": {
    "chainId": 187,
    "baseDex": 363,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      365
    ],
    "prev": 363
  },
  "365": {
    "chainId": 187,
    "baseDex": 363,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 364
  },
  "366": {
    "chainId": 188,
    "baseDex": 366,
    "stage": 1,
    "type": "branch",
    "maxStage": 2,
    "next": [
      367,
      368
    ],
    "prev": null
  },
  "367": {
    "chainId": 188,
    "baseDex": 366,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 366
  },
  "368": {
    "chainId": 188,
    "baseDex": 366,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 366
  },
  "369": {
    "chainId": 189,
    "baseDex": 369,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "370": {
    "chainId": 190,
    "baseDex": 370,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "371": {
    "chainId": 191,
    "baseDex": 371,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      372
    ],
    "prev": null
  },
  "372": {
    "chainId": 191,
    "baseDex": 371,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      373
    ],
    "prev": 371
  },
  "373": {
    "chainId": 191,
    "baseDex": 371,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 372
  },
  "374": {
    "chainId": 192,
    "baseDex": 374,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      375
    ],
    "prev": null
  },
  "375": {
    "chainId": 192,
    "baseDex": 374,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      376
    ],
    "prev": 374
  },
  "376": {
    "chainId": 192,
    "baseDex": 374,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 375
  },
  "377": {
    "chainId": 193,
    "baseDex": 377,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "378": {
    "chainId": 194,
    "baseDex": 378,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "379": {
    "chainId": 195,
    "baseDex": 379,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "380": {
    "chainId": 196,
    "baseDex": 380,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "381": {
    "chainId": 197,
    "baseDex": 381,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "382": {
    "chainId": 198,
    "baseDex": 382,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "383": {
    "chainId": 199,
    "baseDex": 383,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "384": {
    "chainId": 200,
    "baseDex": 384,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "385": {
    "chainId": 201,
    "baseDex": 385,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "386": {
    "chainId": 202,
    "baseDex": 386,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "387": {
    "chainId": 203,
    "baseDex": 387,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      388
    ],
    "prev": null
  },
  "388": {
    "chainId": 203,
    "baseDex": 387,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      389
    ],
    "prev": 387
  },
  "389": {
    "chainId": 203,
    "baseDex": 387,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 388
  },
  "390": {
    "chainId": 204,
    "baseDex": 390,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      391
    ],
    "prev": null
  },
  "391": {
    "chainId": 204,
    "baseDex": 390,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      392
    ],
    "prev": 390
  },
  "392": {
    "chainId": 204,
    "baseDex": 390,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 391
  },
  "393": {
    "chainId": 205,
    "baseDex": 393,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      394
    ],
    "prev": null
  },
  "394": {
    "chainId": 205,
    "baseDex": 393,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      395
    ],
    "prev": 393
  },
  "395": {
    "chainId": 205,
    "baseDex": 393,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 394
  },
  "396": {
    "chainId": 206,
    "baseDex": 396,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      397
    ],
    "prev": null
  },
  "397": {
    "chainId": 206,
    "baseDex": 396,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      398
    ],
    "prev": 396
  },
  "398": {
    "chainId": 206,
    "baseDex": 396,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 397
  },
  "399": {
    "chainId": 207,
    "baseDex": 399,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      400
    ],
    "prev": null
  },
  "400": {
    "chainId": 207,
    "baseDex": 399,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 399
  },
  "401": {
    "chainId": 208,
    "baseDex": 401,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      402
    ],
    "prev": null
  },
  "402": {
    "chainId": 208,
    "baseDex": 401,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 401
  },
  "403": {
    "chainId": 209,
    "baseDex": 403,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      404
    ],
    "prev": null
  },
  "404": {
    "chainId": 209,
    "baseDex": 403,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      405
    ],
    "prev": 403
  },
  "405": {
    "chainId": 209,
    "baseDex": 403,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 404
  },
  "408": {
    "chainId": 211,
    "baseDex": 408,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      409
    ],
    "prev": null
  },
  "409": {
    "chainId": 211,
    "baseDex": 408,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 408
  },
  "410": {
    "chainId": 212,
    "baseDex": 410,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      411
    ],
    "prev": null
  },
  "411": {
    "chainId": 212,
    "baseDex": 410,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 410
  },
  "412": {
    "chainId": 213,
    "baseDex": 412,
    "stage": 1,
    "type": "branch",
    "maxStage": 2,
    "next": [
      413,
      414
    ],
    "prev": null
  },
  "413": {
    "chainId": 213,
    "baseDex": 412,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 412
  },
  "414": {
    "chainId": 213,
    "baseDex": 412,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 412
  },
  "415": {
    "chainId": 214,
    "baseDex": 415,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      416
    ],
    "prev": null
  },
  "416": {
    "chainId": 214,
    "baseDex": 415,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 415
  },
  "417": {
    "chainId": 215,
    "baseDex": 417,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "418": {
    "chainId": 216,
    "baseDex": 418,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      419
    ],
    "prev": null
  },
  "419": {
    "chainId": 216,
    "baseDex": 418,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 418
  },
  "420": {
    "chainId": 217,
    "baseDex": 420,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      421
    ],
    "prev": null
  },
  "421": {
    "chainId": 217,
    "baseDex": 420,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 420
  },
  "422": {
    "chainId": 218,
    "baseDex": 422,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      423
    ],
    "prev": null
  },
  "423": {
    "chainId": 218,
    "baseDex": 422,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 422
  },
  "425": {
    "chainId": 219,
    "baseDex": 425,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      426
    ],
    "prev": null
  },
  "426": {
    "chainId": 219,
    "baseDex": 425,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 425
  },
  "427": {
    "chainId": 220,
    "baseDex": 427,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      428
    ],
    "prev": null
  },
  "428": {
    "chainId": 220,
    "baseDex": 427,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 427
  },
  "431": {
    "chainId": 221,
    "baseDex": 431,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      432
    ],
    "prev": null
  },
  "432": {
    "chainId": 221,
    "baseDex": 431,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 431
  },
  "434": {
    "chainId": 223,
    "baseDex": 434,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      435
    ],
    "prev": null
  },
  "435": {
    "chainId": 223,
    "baseDex": 434,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 434
  },
  "436": {
    "chainId": 224,
    "baseDex": 436,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      437
    ],
    "prev": null
  },
  "437": {
    "chainId": 224,
    "baseDex": 436,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 436
  },
  "441": {
    "chainId": 228,
    "baseDex": 441,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "442": {
    "chainId": 229,
    "baseDex": 442,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "443": {
    "chainId": 230,
    "baseDex": 443,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      444
    ],
    "prev": null
  },
  "444": {
    "chainId": 230,
    "baseDex": 443,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      445
    ],
    "prev": 443
  },
  "445": {
    "chainId": 230,
    "baseDex": 443,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 444
  },
  "447": {
    "chainId": 232,
    "baseDex": 447,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      448
    ],
    "prev": null
  },
  "448": {
    "chainId": 232,
    "baseDex": 447,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 447
  },
  "449": {
    "chainId": 233,
    "baseDex": 449,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      450
    ],
    "prev": null
  },
  "450": {
    "chainId": 233,
    "baseDex": 449,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 449
  },
  "451": {
    "chainId": 234,
    "baseDex": 451,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      452
    ],
    "prev": null
  },
  "452": {
    "chainId": 234,
    "baseDex": 451,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 451
  },
  "453": {
    "chainId": 235,
    "baseDex": 453,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      454
    ],
    "prev": null
  },
  "454": {
    "chainId": 235,
    "baseDex": 453,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 453
  },
  "455": {
    "chainId": 236,
    "baseDex": 455,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "456": {
    "chainId": 237,
    "baseDex": 456,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      457
    ],
    "prev": null
  },
  "457": {
    "chainId": 237,
    "baseDex": 456,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 456
  },
  "459": {
    "chainId": 239,
    "baseDex": 459,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      460
    ],
    "prev": null
  },
  "460": {
    "chainId": 239,
    "baseDex": 459,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 459
  },
  "479": {
    "chainId": 240,
    "baseDex": 479,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "480": {
    "chainId": 241,
    "baseDex": 480,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "481": {
    "chainId": 242,
    "baseDex": 481,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "482": {
    "chainId": 243,
    "baseDex": 482,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "483": {
    "chainId": 244,
    "baseDex": 483,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "484": {
    "chainId": 245,
    "baseDex": 484,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "485": {
    "chainId": 246,
    "baseDex": 485,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "486": {
    "chainId": 247,
    "baseDex": 486,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "487": {
    "chainId": 248,
    "baseDex": 487,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "488": {
    "chainId": 249,
    "baseDex": 488,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "489": {
    "chainId": 250,
    "baseDex": 489,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      490
    ],
    "prev": null
  },
  "490": {
    "chainId": 250,
    "baseDex": 489,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 489
  },
  "491": {
    "chainId": 252,
    "baseDex": 491,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "492": {
    "chainId": 253,
    "baseDex": 492,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "493": {
    "chainId": 254,
    "baseDex": 493,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "494": {
    "chainId": 255,
    "baseDex": 494,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "495": {
    "chainId": 256,
    "baseDex": 495,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      496
    ],
    "prev": null
  },
  "496": {
    "chainId": 256,
    "baseDex": 495,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      497
    ],
    "prev": 495
  },
  "497": {
    "chainId": 256,
    "baseDex": 495,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 496
  },
  "498": {
    "chainId": 257,
    "baseDex": 498,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      499
    ],
    "prev": null
  },
  "499": {
    "chainId": 257,
    "baseDex": 498,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      500
    ],
    "prev": 498
  },
  "500": {
    "chainId": 257,
    "baseDex": 498,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 499
  },
  "501": {
    "chainId": 258,
    "baseDex": 501,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      502
    ],
    "prev": null
  },
  "502": {
    "chainId": 258,
    "baseDex": 501,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      503
    ],
    "prev": 501
  },
  "503": {
    "chainId": 258,
    "baseDex": 501,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 502
  },
  "504": {
    "chainId": 259,
    "baseDex": 504,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      505
    ],
    "prev": null
  },
  "505": {
    "chainId": 259,
    "baseDex": 504,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 504
  },
  "506": {
    "chainId": 260,
    "baseDex": 506,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      507
    ],
    "prev": null
  },
  "507": {
    "chainId": 260,
    "baseDex": 506,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      508
    ],
    "prev": 506
  },
  "508": {
    "chainId": 260,
    "baseDex": 506,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 507
  },
  "509": {
    "chainId": 261,
    "baseDex": 509,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      510
    ],
    "prev": null
  },
  "510": {
    "chainId": 261,
    "baseDex": 509,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 509
  },
  "511": {
    "chainId": 262,
    "baseDex": 511,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      512
    ],
    "prev": null
  },
  "512": {
    "chainId": 262,
    "baseDex": 511,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 511
  },
  "513": {
    "chainId": 263,
    "baseDex": 513,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      514
    ],
    "prev": null
  },
  "514": {
    "chainId": 263,
    "baseDex": 513,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 513
  },
  "515": {
    "chainId": 264,
    "baseDex": 515,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      516
    ],
    "prev": null
  },
  "516": {
    "chainId": 264,
    "baseDex": 515,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 515
  },
  "517": {
    "chainId": 265,
    "baseDex": 517,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      518
    ],
    "prev": null
  },
  "518": {
    "chainId": 265,
    "baseDex": 517,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 517
  },
  "519": {
    "chainId": 266,
    "baseDex": 519,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      520
    ],
    "prev": null
  },
  "520": {
    "chainId": 266,
    "baseDex": 519,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      521
    ],
    "prev": 519
  },
  "521": {
    "chainId": 266,
    "baseDex": 519,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 520
  },
  "524": {
    "chainId": 268,
    "baseDex": 524,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      525
    ],
    "prev": null
  },
  "525": {
    "chainId": 268,
    "baseDex": 524,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      526
    ],
    "prev": 524
  },
  "526": {
    "chainId": 268,
    "baseDex": 524,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 525
  },
  "527": {
    "chainId": 269,
    "baseDex": 527,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      528
    ],
    "prev": null
  },
  "528": {
    "chainId": 269,
    "baseDex": 527,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 527
  },
  "529": {
    "chainId": 270,
    "baseDex": 529,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      530
    ],
    "prev": null
  },
  "530": {
    "chainId": 270,
    "baseDex": 529,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 529
  },
  "531": {
    "chainId": 271,
    "baseDex": 531,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "532": {
    "chainId": 272,
    "baseDex": 532,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      533
    ],
    "prev": null
  },
  "533": {
    "chainId": 272,
    "baseDex": 532,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      534
    ],
    "prev": 532
  },
  "534": {
    "chainId": 272,
    "baseDex": 532,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 533
  },
  "535": {
    "chainId": 273,
    "baseDex": 535,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      536
    ],
    "prev": null
  },
  "536": {
    "chainId": 273,
    "baseDex": 535,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      537
    ],
    "prev": 535
  },
  "537": {
    "chainId": 273,
    "baseDex": 535,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 536
  },
  "539": {
    "chainId": 275,
    "baseDex": 539,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "540": {
    "chainId": 276,
    "baseDex": 540,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      541
    ],
    "prev": null
  },
  "541": {
    "chainId": 276,
    "baseDex": 540,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      542
    ],
    "prev": 540
  },
  "542": {
    "chainId": 276,
    "baseDex": 540,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 541
  },
  "543": {
    "chainId": 277,
    "baseDex": 543,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      544
    ],
    "prev": null
  },
  "544": {
    "chainId": 277,
    "baseDex": 543,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      545
    ],
    "prev": 543
  },
  "545": {
    "chainId": 277,
    "baseDex": 543,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 544
  },
  "546": {
    "chainId": 278,
    "baseDex": 546,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      547
    ],
    "prev": null
  },
  "547": {
    "chainId": 278,
    "baseDex": 546,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 546
  },
  "548": {
    "chainId": 279,
    "baseDex": 548,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      549
    ],
    "prev": null
  },
  "549": {
    "chainId": 279,
    "baseDex": 548,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 548
  },
  "550": {
    "chainId": 280,
    "baseDex": 550,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      902
    ],
    "prev": null
  },
  "902": {
    "chainId": 280,
    "baseDex": 550,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 550
  },
  "551": {
    "chainId": 281,
    "baseDex": 551,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      552
    ],
    "prev": null
  },
  "552": {
    "chainId": 281,
    "baseDex": 551,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      553
    ],
    "prev": 551
  },
  "553": {
    "chainId": 281,
    "baseDex": 551,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 552
  },
  "554": {
    "chainId": 282,
    "baseDex": 554,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      555
    ],
    "prev": null
  },
  "555": {
    "chainId": 282,
    "baseDex": 554,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 554
  },
  "556": {
    "chainId": 283,
    "baseDex": 556,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "557": {
    "chainId": 284,
    "baseDex": 557,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      558
    ],
    "prev": null
  },
  "558": {
    "chainId": 284,
    "baseDex": 557,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 557
  },
  "559": {
    "chainId": 285,
    "baseDex": 559,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      560
    ],
    "prev": null
  },
  "560": {
    "chainId": 285,
    "baseDex": 559,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 559
  },
  "561": {
    "chainId": 286,
    "baseDex": 561,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "562": {
    "chainId": 287,
    "baseDex": 562,
    "stage": 1,
    "type": "branch",
    "maxStage": 2,
    "next": [
      563,
      867
    ],
    "prev": null
  },
  "563": {
    "chainId": 287,
    "baseDex": 562,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 562
  },
  "867": {
    "chainId": 287,
    "baseDex": 562,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 562
  },
  "566": {
    "chainId": 289,
    "baseDex": 566,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      567
    ],
    "prev": null
  },
  "567": {
    "chainId": 289,
    "baseDex": 566,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 566
  },
  "568": {
    "chainId": 290,
    "baseDex": 568,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      569
    ],
    "prev": null
  },
  "569": {
    "chainId": 290,
    "baseDex": 568,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 568
  },
  "570": {
    "chainId": 291,
    "baseDex": 570,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      571
    ],
    "prev": null
  },
  "571": {
    "chainId": 291,
    "baseDex": 570,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 570
  },
  "572": {
    "chainId": 292,
    "baseDex": 572,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      573
    ],
    "prev": null
  },
  "573": {
    "chainId": 292,
    "baseDex": 572,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 572
  },
  "574": {
    "chainId": 293,
    "baseDex": 574,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      575
    ],
    "prev": null
  },
  "575": {
    "chainId": 293,
    "baseDex": 574,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      576
    ],
    "prev": 574
  },
  "576": {
    "chainId": 293,
    "baseDex": 574,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 575
  },
  "577": {
    "chainId": 294,
    "baseDex": 577,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      578
    ],
    "prev": null
  },
  "578": {
    "chainId": 294,
    "baseDex": 577,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      579
    ],
    "prev": 577
  },
  "579": {
    "chainId": 294,
    "baseDex": 577,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 578
  },
  "580": {
    "chainId": 295,
    "baseDex": 580,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      581
    ],
    "prev": null
  },
  "581": {
    "chainId": 295,
    "baseDex": 580,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 580
  },
  "582": {
    "chainId": 296,
    "baseDex": 582,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      583
    ],
    "prev": null
  },
  "583": {
    "chainId": 296,
    "baseDex": 582,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      584
    ],
    "prev": 582
  },
  "584": {
    "chainId": 296,
    "baseDex": 582,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 583
  },
  "585": {
    "chainId": 297,
    "baseDex": 585,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      586
    ],
    "prev": null
  },
  "586": {
    "chainId": 297,
    "baseDex": 585,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 585
  },
  "587": {
    "chainId": 298,
    "baseDex": 587,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "588": {
    "chainId": 299,
    "baseDex": 588,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      589
    ],
    "prev": null
  },
  "589": {
    "chainId": 299,
    "baseDex": 588,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 588
  },
  "590": {
    "chainId": 300,
    "baseDex": 590,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      591
    ],
    "prev": null
  },
  "591": {
    "chainId": 300,
    "baseDex": 590,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 590
  },
  "594": {
    "chainId": 302,
    "baseDex": 594,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "595": {
    "chainId": 303,
    "baseDex": 595,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      596
    ],
    "prev": null
  },
  "596": {
    "chainId": 303,
    "baseDex": 595,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 595
  },
  "597": {
    "chainId": 304,
    "baseDex": 597,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      598
    ],
    "prev": null
  },
  "598": {
    "chainId": 304,
    "baseDex": 597,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 597
  },
  "599": {
    "chainId": 305,
    "baseDex": 599,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      600
    ],
    "prev": null
  },
  "600": {
    "chainId": 305,
    "baseDex": 599,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      601
    ],
    "prev": 599
  },
  "601": {
    "chainId": 305,
    "baseDex": 599,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 600
  },
  "602": {
    "chainId": 306,
    "baseDex": 602,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      603
    ],
    "prev": null
  },
  "603": {
    "chainId": 306,
    "baseDex": 602,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      604
    ],
    "prev": 602
  },
  "604": {
    "chainId": 306,
    "baseDex": 602,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 603
  },
  "605": {
    "chainId": 307,
    "baseDex": 605,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      606
    ],
    "prev": null
  },
  "606": {
    "chainId": 307,
    "baseDex": 605,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 605
  },
  "607": {
    "chainId": 308,
    "baseDex": 607,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      608
    ],
    "prev": null
  },
  "608": {
    "chainId": 308,
    "baseDex": 607,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      609
    ],
    "prev": 607
  },
  "609": {
    "chainId": 308,
    "baseDex": 607,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 608
  },
  "610": {
    "chainId": 309,
    "baseDex": 610,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      611
    ],
    "prev": null
  },
  "611": {
    "chainId": 309,
    "baseDex": 610,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      612
    ],
    "prev": 610
  },
  "612": {
    "chainId": 309,
    "baseDex": 610,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 611
  },
  "613": {
    "chainId": 310,
    "baseDex": 613,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      614
    ],
    "prev": null
  },
  "614": {
    "chainId": 310,
    "baseDex": 613,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 613
  },
  "615": {
    "chainId": 311,
    "baseDex": 615,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "616": {
    "chainId": 312,
    "baseDex": 616,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      617
    ],
    "prev": null
  },
  "617": {
    "chainId": 312,
    "baseDex": 616,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 616
  },
  "619": {
    "chainId": 314,
    "baseDex": 619,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      620
    ],
    "prev": null
  },
  "620": {
    "chainId": 314,
    "baseDex": 619,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 619
  },
  "621": {
    "chainId": 315,
    "baseDex": 621,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "622": {
    "chainId": 316,
    "baseDex": 622,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      623
    ],
    "prev": null
  },
  "623": {
    "chainId": 316,
    "baseDex": 622,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 622
  },
  "624": {
    "chainId": 317,
    "baseDex": 624,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      625
    ],
    "prev": null
  },
  "625": {
    "chainId": 317,
    "baseDex": 624,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      983
    ],
    "prev": 624
  },
  "983": {
    "chainId": 317,
    "baseDex": 624,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 625
  },
  "627": {
    "chainId": 319,
    "baseDex": 627,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      628
    ],
    "prev": null
  },
  "628": {
    "chainId": 319,
    "baseDex": 627,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 627
  },
  "629": {
    "chainId": 320,
    "baseDex": 629,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      630
    ],
    "prev": null
  },
  "630": {
    "chainId": 320,
    "baseDex": 629,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 629
  },
  "631": {
    "chainId": 321,
    "baseDex": 631,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "632": {
    "chainId": 322,
    "baseDex": 632,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "633": {
    "chainId": 323,
    "baseDex": 633,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      634
    ],
    "prev": null
  },
  "634": {
    "chainId": 323,
    "baseDex": 633,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      635
    ],
    "prev": 633
  },
  "635": {
    "chainId": 323,
    "baseDex": 633,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 634
  },
  "636": {
    "chainId": 324,
    "baseDex": 636,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      637
    ],
    "prev": null
  },
  "637": {
    "chainId": 324,
    "baseDex": 636,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 636
  },
  "638": {
    "chainId": 325,
    "baseDex": 638,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "639": {
    "chainId": 326,
    "baseDex": 639,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "640": {
    "chainId": 327,
    "baseDex": 640,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "641": {
    "chainId": 328,
    "baseDex": 641,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "642": {
    "chainId": 329,
    "baseDex": 642,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "643": {
    "chainId": 330,
    "baseDex": 643,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "644": {
    "chainId": 331,
    "baseDex": 644,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "645": {
    "chainId": 332,
    "baseDex": 645,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "646": {
    "chainId": 333,
    "baseDex": 646,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "647": {
    "chainId": 334,
    "baseDex": 647,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "648": {
    "chainId": 335,
    "baseDex": 648,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "649": {
    "chainId": 336,
    "baseDex": 649,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "650": {
    "chainId": 337,
    "baseDex": 650,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      651
    ],
    "prev": null
  },
  "651": {
    "chainId": 337,
    "baseDex": 650,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      652
    ],
    "prev": 650
  },
  "652": {
    "chainId": 337,
    "baseDex": 650,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 651
  },
  "653": {
    "chainId": 338,
    "baseDex": 653,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      654
    ],
    "prev": null
  },
  "654": {
    "chainId": 338,
    "baseDex": 653,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      655
    ],
    "prev": 653
  },
  "655": {
    "chainId": 338,
    "baseDex": 653,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 654
  },
  "656": {
    "chainId": 339,
    "baseDex": 656,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      657
    ],
    "prev": null
  },
  "657": {
    "chainId": 339,
    "baseDex": 656,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      658
    ],
    "prev": 656
  },
  "658": {
    "chainId": 339,
    "baseDex": 656,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 657
  },
  "659": {
    "chainId": 340,
    "baseDex": 659,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      660
    ],
    "prev": null
  },
  "660": {
    "chainId": 340,
    "baseDex": 659,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 659
  },
  "661": {
    "chainId": 341,
    "baseDex": 661,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      662
    ],
    "prev": null
  },
  "662": {
    "chainId": 341,
    "baseDex": 661,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      663
    ],
    "prev": 661
  },
  "663": {
    "chainId": 341,
    "baseDex": 661,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 662
  },
  "664": {
    "chainId": 342,
    "baseDex": 664,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      665
    ],
    "prev": null
  },
  "665": {
    "chainId": 342,
    "baseDex": 664,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      666
    ],
    "prev": 664
  },
  "666": {
    "chainId": 342,
    "baseDex": 664,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 665
  },
  "667": {
    "chainId": 343,
    "baseDex": 667,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      668
    ],
    "prev": null
  },
  "668": {
    "chainId": 343,
    "baseDex": 667,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 667
  },
  "669": {
    "chainId": 344,
    "baseDex": 669,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      670
    ],
    "prev": null
  },
  "670": {
    "chainId": 344,
    "baseDex": 669,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      671
    ],
    "prev": 669
  },
  "671": {
    "chainId": 344,
    "baseDex": 669,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 670
  },
  "672": {
    "chainId": 345,
    "baseDex": 672,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      673
    ],
    "prev": null
  },
  "673": {
    "chainId": 345,
    "baseDex": 672,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 672
  },
  "674": {
    "chainId": 346,
    "baseDex": 674,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      675
    ],
    "prev": null
  },
  "675": {
    "chainId": 346,
    "baseDex": 674,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 674
  },
  "676": {
    "chainId": 347,
    "baseDex": 676,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "677": {
    "chainId": 348,
    "baseDex": 677,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      678
    ],
    "prev": null
  },
  "678": {
    "chainId": 348,
    "baseDex": 677,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 677
  },
  "679": {
    "chainId": 349,
    "baseDex": 679,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      680
    ],
    "prev": null
  },
  "680": {
    "chainId": 349,
    "baseDex": 679,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      681
    ],
    "prev": 679
  },
  "681": {
    "chainId": 349,
    "baseDex": 679,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 680
  },
  "682": {
    "chainId": 350,
    "baseDex": 682,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      683
    ],
    "prev": null
  },
  "683": {
    "chainId": 350,
    "baseDex": 682,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 682
  },
  "684": {
    "chainId": 351,
    "baseDex": 684,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      685
    ],
    "prev": null
  },
  "685": {
    "chainId": 351,
    "baseDex": 684,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 684
  },
  "686": {
    "chainId": 352,
    "baseDex": 686,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      687
    ],
    "prev": null
  },
  "687": {
    "chainId": 352,
    "baseDex": 686,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 686
  },
  "688": {
    "chainId": 353,
    "baseDex": 688,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      689
    ],
    "prev": null
  },
  "689": {
    "chainId": 353,
    "baseDex": 688,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 688
  },
  "690": {
    "chainId": 354,
    "baseDex": 690,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      691
    ],
    "prev": null
  },
  "691": {
    "chainId": 354,
    "baseDex": 690,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 690
  },
  "692": {
    "chainId": 355,
    "baseDex": 692,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      693
    ],
    "prev": null
  },
  "693": {
    "chainId": 355,
    "baseDex": 692,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 692
  },
  "694": {
    "chainId": 356,
    "baseDex": 694,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      695
    ],
    "prev": null
  },
  "695": {
    "chainId": 356,
    "baseDex": 694,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 694
  },
  "696": {
    "chainId": 357,
    "baseDex": 696,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      697
    ],
    "prev": null
  },
  "697": {
    "chainId": 357,
    "baseDex": 696,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 696
  },
  "698": {
    "chainId": 358,
    "baseDex": 698,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      699
    ],
    "prev": null
  },
  "699": {
    "chainId": 358,
    "baseDex": 698,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 698
  },
  "701": {
    "chainId": 359,
    "baseDex": 701,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "702": {
    "chainId": 360,
    "baseDex": 702,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "703": {
    "chainId": 361,
    "baseDex": 703,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "704": {
    "chainId": 362,
    "baseDex": 704,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      705
    ],
    "prev": null
  },
  "705": {
    "chainId": 362,
    "baseDex": 704,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      706
    ],
    "prev": 704
  },
  "706": {
    "chainId": 362,
    "baseDex": 704,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 705
  },
  "707": {
    "chainId": 363,
    "baseDex": 707,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "708": {
    "chainId": 364,
    "baseDex": 708,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      709
    ],
    "prev": null
  },
  "709": {
    "chainId": 364,
    "baseDex": 708,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 708
  },
  "710": {
    "chainId": 365,
    "baseDex": 710,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      711
    ],
    "prev": null
  },
  "711": {
    "chainId": 365,
    "baseDex": 710,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 710
  },
  "712": {
    "chainId": 366,
    "baseDex": 712,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      713
    ],
    "prev": null
  },
  "713": {
    "chainId": 366,
    "baseDex": 712,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 712
  },
  "714": {
    "chainId": 367,
    "baseDex": 714,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      715
    ],
    "prev": null
  },
  "715": {
    "chainId": 367,
    "baseDex": 714,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 714
  },
  "716": {
    "chainId": 368,
    "baseDex": 716,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "717": {
    "chainId": 369,
    "baseDex": 717,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "718": {
    "chainId": 370,
    "baseDex": 718,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "719": {
    "chainId": 371,
    "baseDex": 719,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "720": {
    "chainId": 372,
    "baseDex": 720,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "721": {
    "chainId": 373,
    "baseDex": 721,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "722": {
    "chainId": 374,
    "baseDex": 722,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      723
    ],
    "prev": null
  },
  "723": {
    "chainId": 374,
    "baseDex": 722,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      724
    ],
    "prev": 722
  },
  "724": {
    "chainId": 374,
    "baseDex": 722,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 723
  },
  "725": {
    "chainId": 375,
    "baseDex": 725,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      726
    ],
    "prev": null
  },
  "726": {
    "chainId": 375,
    "baseDex": 725,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      727
    ],
    "prev": 725
  },
  "727": {
    "chainId": 375,
    "baseDex": 725,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 726
  },
  "728": {
    "chainId": 376,
    "baseDex": 728,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      729
    ],
    "prev": null
  },
  "729": {
    "chainId": 376,
    "baseDex": 728,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      730
    ],
    "prev": 728
  },
  "730": {
    "chainId": 376,
    "baseDex": 728,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 729
  },
  "731": {
    "chainId": 377,
    "baseDex": 731,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      732
    ],
    "prev": null
  },
  "732": {
    "chainId": 377,
    "baseDex": 731,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      733
    ],
    "prev": 731
  },
  "733": {
    "chainId": 377,
    "baseDex": 731,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 732
  },
  "734": {
    "chainId": 378,
    "baseDex": 734,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      735
    ],
    "prev": null
  },
  "735": {
    "chainId": 378,
    "baseDex": 734,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 734
  },
  "736": {
    "chainId": 379,
    "baseDex": 736,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      737
    ],
    "prev": null
  },
  "737": {
    "chainId": 379,
    "baseDex": 736,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      738
    ],
    "prev": 736
  },
  "738": {
    "chainId": 379,
    "baseDex": 736,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 737
  },
  "739": {
    "chainId": 380,
    "baseDex": 739,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      740
    ],
    "prev": null
  },
  "740": {
    "chainId": 380,
    "baseDex": 739,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 739
  },
  "741": {
    "chainId": 381,
    "baseDex": 741,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "742": {
    "chainId": 382,
    "baseDex": 742,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      743
    ],
    "prev": null
  },
  "743": {
    "chainId": 382,
    "baseDex": 742,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 742
  },
  "744": {
    "chainId": 383,
    "baseDex": 744,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      745
    ],
    "prev": null
  },
  "745": {
    "chainId": 383,
    "baseDex": 744,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 744
  },
  "746": {
    "chainId": 384,
    "baseDex": 746,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "747": {
    "chainId": 385,
    "baseDex": 747,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      748
    ],
    "prev": null
  },
  "748": {
    "chainId": 385,
    "baseDex": 747,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 747
  },
  "749": {
    "chainId": 386,
    "baseDex": 749,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      750
    ],
    "prev": null
  },
  "750": {
    "chainId": 386,
    "baseDex": 749,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 749
  },
  "751": {
    "chainId": 387,
    "baseDex": 751,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      752
    ],
    "prev": null
  },
  "752": {
    "chainId": 387,
    "baseDex": 751,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 751
  },
  "753": {
    "chainId": 388,
    "baseDex": 753,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      754
    ],
    "prev": null
  },
  "754": {
    "chainId": 388,
    "baseDex": 753,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 753
  },
  "755": {
    "chainId": 389,
    "baseDex": 755,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      756
    ],
    "prev": null
  },
  "756": {
    "chainId": 389,
    "baseDex": 755,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 755
  },
  "757": {
    "chainId": 390,
    "baseDex": 757,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      758
    ],
    "prev": null
  },
  "758": {
    "chainId": 390,
    "baseDex": 757,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 757
  },
  "759": {
    "chainId": 391,
    "baseDex": 759,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      760
    ],
    "prev": null
  },
  "760": {
    "chainId": 391,
    "baseDex": 759,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 759
  },
  "761": {
    "chainId": 392,
    "baseDex": 761,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      762
    ],
    "prev": null
  },
  "762": {
    "chainId": 392,
    "baseDex": 761,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      763
    ],
    "prev": 761
  },
  "763": {
    "chainId": 392,
    "baseDex": 761,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 762
  },
  "764": {
    "chainId": 393,
    "baseDex": 764,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "766": {
    "chainId": 395,
    "baseDex": 766,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "767": {
    "chainId": 396,
    "baseDex": 767,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      768
    ],
    "prev": null
  },
  "768": {
    "chainId": 396,
    "baseDex": 767,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 767
  },
  "769": {
    "chainId": 397,
    "baseDex": 769,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      770
    ],
    "prev": null
  },
  "770": {
    "chainId": 397,
    "baseDex": 769,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 769
  },
  "771": {
    "chainId": 398,
    "baseDex": 771,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "772": {
    "chainId": 399,
    "baseDex": 772,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      773
    ],
    "prev": null
  },
  "773": {
    "chainId": 399,
    "baseDex": 772,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 772
  },
  "774": {
    "chainId": 400,
    "baseDex": 774,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "775": {
    "chainId": 401,
    "baseDex": 775,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "776": {
    "chainId": 402,
    "baseDex": 776,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "777": {
    "chainId": 403,
    "baseDex": 777,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "778": {
    "chainId": 404,
    "baseDex": 778,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "779": {
    "chainId": 405,
    "baseDex": 779,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "780": {
    "chainId": 406,
    "baseDex": 780,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "781": {
    "chainId": 407,
    "baseDex": 781,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "782": {
    "chainId": 408,
    "baseDex": 782,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      783
    ],
    "prev": null
  },
  "783": {
    "chainId": 408,
    "baseDex": 782,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      784
    ],
    "prev": 782
  },
  "784": {
    "chainId": 408,
    "baseDex": 782,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 783
  },
  "785": {
    "chainId": 409,
    "baseDex": 785,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "786": {
    "chainId": 410,
    "baseDex": 786,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "787": {
    "chainId": 411,
    "baseDex": 787,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "788": {
    "chainId": 412,
    "baseDex": 788,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "789": {
    "chainId": 413,
    "baseDex": 789,
    "stage": 1,
    "type": "branch",
    "maxStage": 3,
    "next": [
      790
    ],
    "prev": null
  },
  "790": {
    "chainId": 413,
    "baseDex": 789,
    "stage": 2,
    "type": "branch",
    "maxStage": 3,
    "next": [
      791,
      792
    ],
    "prev": 789
  },
  "791": {
    "chainId": 413,
    "baseDex": 789,
    "stage": 3,
    "type": "branch",
    "maxStage": 3,
    "next": [],
    "prev": 790
  },
  "792": {
    "chainId": 413,
    "baseDex": 789,
    "stage": 3,
    "type": "branch",
    "maxStage": 3,
    "next": [],
    "prev": 790
  },
  "793": {
    "chainId": 414,
    "baseDex": 793,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "794": {
    "chainId": 415,
    "baseDex": 794,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "795": {
    "chainId": 416,
    "baseDex": 795,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "796": {
    "chainId": 417,
    "baseDex": 796,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "797": {
    "chainId": 418,
    "baseDex": 797,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "798": {
    "chainId": 419,
    "baseDex": 798,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "799": {
    "chainId": 420,
    "baseDex": 799,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "800": {
    "chainId": 421,
    "baseDex": 800,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "801": {
    "chainId": 422,
    "baseDex": 801,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "802": {
    "chainId": 423,
    "baseDex": 802,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "803": {
    "chainId": 424,
    "baseDex": 803,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      804
    ],
    "prev": null
  },
  "804": {
    "chainId": 424,
    "baseDex": 803,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 803
  },
  "805": {
    "chainId": 425,
    "baseDex": 805,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "806": {
    "chainId": 426,
    "baseDex": 806,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "807": {
    "chainId": 427,
    "baseDex": 807,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "808": {
    "chainId": 428,
    "baseDex": 808,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      809
    ],
    "prev": null
  },
  "809": {
    "chainId": 428,
    "baseDex": 808,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 808
  },
  "810": {
    "chainId": 430,
    "baseDex": 810,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      811
    ],
    "prev": null
  },
  "811": {
    "chainId": 430,
    "baseDex": 810,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      812
    ],
    "prev": 810
  },
  "812": {
    "chainId": 430,
    "baseDex": 810,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 811
  },
  "813": {
    "chainId": 431,
    "baseDex": 813,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      814
    ],
    "prev": null
  },
  "814": {
    "chainId": 431,
    "baseDex": 813,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      815
    ],
    "prev": 813
  },
  "815": {
    "chainId": 431,
    "baseDex": 813,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 814
  },
  "816": {
    "chainId": 432,
    "baseDex": 816,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      817
    ],
    "prev": null
  },
  "817": {
    "chainId": 432,
    "baseDex": 816,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      818
    ],
    "prev": 816
  },
  "818": {
    "chainId": 432,
    "baseDex": 816,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 817
  },
  "819": {
    "chainId": 433,
    "baseDex": 819,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      820
    ],
    "prev": null
  },
  "820": {
    "chainId": 433,
    "baseDex": 819,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 819
  },
  "821": {
    "chainId": 434,
    "baseDex": 821,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      822
    ],
    "prev": null
  },
  "822": {
    "chainId": 434,
    "baseDex": 821,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      823
    ],
    "prev": 821
  },
  "823": {
    "chainId": 434,
    "baseDex": 821,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 822
  },
  "824": {
    "chainId": 435,
    "baseDex": 824,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      825
    ],
    "prev": null
  },
  "825": {
    "chainId": 435,
    "baseDex": 824,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      826
    ],
    "prev": 824
  },
  "826": {
    "chainId": 435,
    "baseDex": 824,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 825
  },
  "827": {
    "chainId": 436,
    "baseDex": 827,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      828
    ],
    "prev": null
  },
  "828": {
    "chainId": 436,
    "baseDex": 827,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 827
  },
  "829": {
    "chainId": 437,
    "baseDex": 829,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      830
    ],
    "prev": null
  },
  "830": {
    "chainId": 437,
    "baseDex": 829,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 829
  },
  "831": {
    "chainId": 438,
    "baseDex": 831,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      832
    ],
    "prev": null
  },
  "832": {
    "chainId": 438,
    "baseDex": 831,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 831
  },
  "833": {
    "chainId": 439,
    "baseDex": 833,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      834
    ],
    "prev": null
  },
  "834": {
    "chainId": 439,
    "baseDex": 833,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 833
  },
  "835": {
    "chainId": 440,
    "baseDex": 835,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      836
    ],
    "prev": null
  },
  "836": {
    "chainId": 440,
    "baseDex": 835,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 835
  },
  "840": {
    "chainId": 442,
    "baseDex": 840,
    "stage": 1,
    "type": "branch",
    "maxStage": 3,
    "next": [
      841,
      842,
      1011
    ],
    "prev": null
  },
  "841": {
    "chainId": 442,
    "baseDex": 840,
    "stage": 2,
    "type": "branch",
    "maxStage": 3,
    "next": [],
    "prev": 840
  },
  "842": {
    "chainId": 442,
    "baseDex": 840,
    "stage": 2,
    "type": "branch",
    "maxStage": 3,
    "next": [],
    "prev": 840
  },
  "1011": {
    "chainId": 442,
    "baseDex": 840,
    "stage": 2,
    "type": "branch",
    "maxStage": 3,
    "next": [
      1019
    ],
    "prev": 840
  },
  "1019": {
    "chainId": 442,
    "baseDex": 840,
    "stage": 3,
    "type": "branch",
    "maxStage": 3,
    "next": [],
    "prev": 1011
  },
  "843": {
    "chainId": 443,
    "baseDex": 843,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      844
    ],
    "prev": null
  },
  "844": {
    "chainId": 443,
    "baseDex": 843,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 843
  },
  "845": {
    "chainId": 444,
    "baseDex": 845,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "846": {
    "chainId": 445,
    "baseDex": 846,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      847
    ],
    "prev": null
  },
  "847": {
    "chainId": 445,
    "baseDex": 846,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 846
  },
  "848": {
    "chainId": 446,
    "baseDex": 848,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      849
    ],
    "prev": null
  },
  "849": {
    "chainId": 446,
    "baseDex": 848,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 848
  },
  "850": {
    "chainId": 447,
    "baseDex": 850,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      851
    ],
    "prev": null
  },
  "851": {
    "chainId": 447,
    "baseDex": 850,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 850
  },
  "852": {
    "chainId": 448,
    "baseDex": 852,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      853
    ],
    "prev": null
  },
  "853": {
    "chainId": 448,
    "baseDex": 852,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 852
  },
  "854": {
    "chainId": 449,
    "baseDex": 854,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      855
    ],
    "prev": null
  },
  "855": {
    "chainId": 449,
    "baseDex": 854,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 854
  },
  "856": {
    "chainId": 450,
    "baseDex": 856,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      857
    ],
    "prev": null
  },
  "857": {
    "chainId": 450,
    "baseDex": 856,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      858
    ],
    "prev": 856
  },
  "858": {
    "chainId": 450,
    "baseDex": 856,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 857
  },
  "859": {
    "chainId": 451,
    "baseDex": 859,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      860
    ],
    "prev": null
  },
  "860": {
    "chainId": 451,
    "baseDex": 859,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      861
    ],
    "prev": 859
  },
  "861": {
    "chainId": 451,
    "baseDex": 859,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 860
  },
  "868": {
    "chainId": 452,
    "baseDex": 868,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      869
    ],
    "prev": null
  },
  "869": {
    "chainId": 452,
    "baseDex": 868,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 868
  },
  "871": {
    "chainId": 454,
    "baseDex": 871,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "872": {
    "chainId": 455,
    "baseDex": 872,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      873
    ],
    "prev": null
  },
  "873": {
    "chainId": 455,
    "baseDex": 872,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 872
  },
  "874": {
    "chainId": 456,
    "baseDex": 874,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "875": {
    "chainId": 457,
    "baseDex": 875,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "876": {
    "chainId": 458,
    "baseDex": 876,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "877": {
    "chainId": 459,
    "baseDex": 877,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "880": {
    "chainId": 461,
    "baseDex": 880,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "881": {
    "chainId": 462,
    "baseDex": 881,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "882": {
    "chainId": 463,
    "baseDex": 882,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "883": {
    "chainId": 464,
    "baseDex": 883,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "884": {
    "chainId": 465,
    "baseDex": 884,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      1018
    ],
    "prev": null
  },
  "1018": {
    "chainId": 465,
    "baseDex": 884,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 884
  },
  "885": {
    "chainId": 466,
    "baseDex": 885,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      886
    ],
    "prev": null
  },
  "886": {
    "chainId": 466,
    "baseDex": 885,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      887
    ],
    "prev": 885
  },
  "887": {
    "chainId": 466,
    "baseDex": 885,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 886
  },
  "888": {
    "chainId": 467,
    "baseDex": 888,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "889": {
    "chainId": 468,
    "baseDex": 889,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "890": {
    "chainId": 469,
    "baseDex": 890,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "891": {
    "chainId": 470,
    "baseDex": 891,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      892
    ],
    "prev": null
  },
  "892": {
    "chainId": 470,
    "baseDex": 891,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 891
  },
  "894": {
    "chainId": 472,
    "baseDex": 894,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "895": {
    "chainId": 473,
    "baseDex": 895,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "896": {
    "chainId": 474,
    "baseDex": 896,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "897": {
    "chainId": 475,
    "baseDex": 897,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "898": {
    "chainId": 476,
    "baseDex": 898,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "905": {
    "chainId": 477,
    "baseDex": 905,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "906": {
    "chainId": 478,
    "baseDex": 906,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      907
    ],
    "prev": null
  },
  "907": {
    "chainId": 478,
    "baseDex": 906,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      908
    ],
    "prev": 906
  },
  "908": {
    "chainId": 478,
    "baseDex": 906,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 907
  },
  "909": {
    "chainId": 479,
    "baseDex": 909,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      910
    ],
    "prev": null
  },
  "910": {
    "chainId": 479,
    "baseDex": 909,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      911
    ],
    "prev": 909
  },
  "911": {
    "chainId": 479,
    "baseDex": 909,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 910
  },
  "912": {
    "chainId": 480,
    "baseDex": 912,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      913
    ],
    "prev": null
  },
  "913": {
    "chainId": 480,
    "baseDex": 912,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      914
    ],
    "prev": 912
  },
  "914": {
    "chainId": 480,
    "baseDex": 912,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 913
  },
  "915": {
    "chainId": 481,
    "baseDex": 915,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      916
    ],
    "prev": null
  },
  "916": {
    "chainId": 481,
    "baseDex": 915,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 915
  },
  "917": {
    "chainId": 482,
    "baseDex": 917,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      918
    ],
    "prev": null
  },
  "918": {
    "chainId": 482,
    "baseDex": 917,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 917
  },
  "919": {
    "chainId": 483,
    "baseDex": 919,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      920
    ],
    "prev": null
  },
  "920": {
    "chainId": 483,
    "baseDex": 919,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 919
  },
  "921": {
    "chainId": 484,
    "baseDex": 921,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      922
    ],
    "prev": null
  },
  "922": {
    "chainId": 484,
    "baseDex": 921,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      923
    ],
    "prev": 921
  },
  "923": {
    "chainId": 484,
    "baseDex": 921,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 922
  },
  "924": {
    "chainId": 485,
    "baseDex": 924,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      925
    ],
    "prev": null
  },
  "925": {
    "chainId": 485,
    "baseDex": 924,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 924
  },
  "926": {
    "chainId": 486,
    "baseDex": 926,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      927
    ],
    "prev": null
  },
  "927": {
    "chainId": 486,
    "baseDex": 926,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 926
  },
  "928": {
    "chainId": 487,
    "baseDex": 928,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      929
    ],
    "prev": null
  },
  "929": {
    "chainId": 487,
    "baseDex": 928,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      930
    ],
    "prev": 928
  },
  "930": {
    "chainId": 487,
    "baseDex": 928,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 929
  },
  "932": {
    "chainId": 489,
    "baseDex": 932,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      933
    ],
    "prev": null
  },
  "933": {
    "chainId": 489,
    "baseDex": 932,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      934
    ],
    "prev": 932
  },
  "934": {
    "chainId": 489,
    "baseDex": 932,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 933
  },
  "935": {
    "chainId": 490,
    "baseDex": 935,
    "stage": 1,
    "type": "branch",
    "maxStage": 2,
    "next": [
      936,
      937
    ],
    "prev": null
  },
  "936": {
    "chainId": 490,
    "baseDex": 935,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 935
  },
  "937": {
    "chainId": 490,
    "baseDex": 935,
    "stage": 2,
    "type": "branch",
    "maxStage": 2,
    "next": [],
    "prev": 935
  },
  "938": {
    "chainId": 491,
    "baseDex": 938,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      939
    ],
    "prev": null
  },
  "939": {
    "chainId": 491,
    "baseDex": 938,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 938
  },
  "940": {
    "chainId": 492,
    "baseDex": 940,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      941
    ],
    "prev": null
  },
  "941": {
    "chainId": 492,
    "baseDex": 940,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 940
  },
  "946": {
    "chainId": 495,
    "baseDex": 946,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      947
    ],
    "prev": null
  },
  "947": {
    "chainId": 495,
    "baseDex": 946,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 946
  },
  "951": {
    "chainId": 498,
    "baseDex": 951,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      952
    ],
    "prev": null
  },
  "952": {
    "chainId": 498,
    "baseDex": 951,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 951
  },
  "953": {
    "chainId": 499,
    "baseDex": 953,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      954
    ],
    "prev": null
  },
  "954": {
    "chainId": 499,
    "baseDex": 953,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 953
  },
  "955": {
    "chainId": 500,
    "baseDex": 955,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      956
    ],
    "prev": null
  },
  "956": {
    "chainId": 500,
    "baseDex": 955,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 955
  },
  "957": {
    "chainId": 501,
    "baseDex": 957,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      958
    ],
    "prev": null
  },
  "958": {
    "chainId": 501,
    "baseDex": 957,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      959
    ],
    "prev": 957
  },
  "959": {
    "chainId": 501,
    "baseDex": 957,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 958
  },
  "960": {
    "chainId": 502,
    "baseDex": 960,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      961
    ],
    "prev": null
  },
  "961": {
    "chainId": 502,
    "baseDex": 960,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 960
  },
  "963": {
    "chainId": 504,
    "baseDex": 963,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      964
    ],
    "prev": null
  },
  "964": {
    "chainId": 504,
    "baseDex": 963,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 963
  },
  "965": {
    "chainId": 505,
    "baseDex": 965,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      966
    ],
    "prev": null
  },
  "966": {
    "chainId": 505,
    "baseDex": 965,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 965
  },
  "967": {
    "chainId": 506,
    "baseDex": 967,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "968": {
    "chainId": 507,
    "baseDex": 968,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "969": {
    "chainId": 508,
    "baseDex": 969,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      970
    ],
    "prev": null
  },
  "970": {
    "chainId": 508,
    "baseDex": 969,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 969
  },
  "971": {
    "chainId": 509,
    "baseDex": 971,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      972
    ],
    "prev": null
  },
  "972": {
    "chainId": 509,
    "baseDex": 971,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 971
  },
  "974": {
    "chainId": 511,
    "baseDex": 974,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      975
    ],
    "prev": null
  },
  "975": {
    "chainId": 511,
    "baseDex": 974,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 974
  },
  "976": {
    "chainId": 512,
    "baseDex": 976,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "977": {
    "chainId": 513,
    "baseDex": 977,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "978": {
    "chainId": 514,
    "baseDex": 978,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "984": {
    "chainId": 515,
    "baseDex": 984,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "985": {
    "chainId": 516,
    "baseDex": 985,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "987": {
    "chainId": 518,
    "baseDex": 987,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "988": {
    "chainId": 519,
    "baseDex": 988,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "989": {
    "chainId": 520,
    "baseDex": 989,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "991": {
    "chainId": 522,
    "baseDex": 991,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "992": {
    "chainId": 523,
    "baseDex": 992,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "994": {
    "chainId": 525,
    "baseDex": 994,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "995": {
    "chainId": 526,
    "baseDex": 995,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "996": {
    "chainId": 527,
    "baseDex": 996,
    "stage": 1,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      997
    ],
    "prev": null
  },
  "997": {
    "chainId": 527,
    "baseDex": 996,
    "stage": 2,
    "type": "3stage",
    "maxStage": 3,
    "next": [
      998
    ],
    "prev": 996
  },
  "998": {
    "chainId": 527,
    "baseDex": 996,
    "stage": 3,
    "type": "3stage",
    "maxStage": 3,
    "next": [],
    "prev": 997
  },
  "999": {
    "chainId": 528,
    "baseDex": 999,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      1000
    ],
    "prev": null
  },
  "1000": {
    "chainId": 528,
    "baseDex": 999,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 999
  },
  "1004": {
    "chainId": 532,
    "baseDex": 1004,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "1005": {
    "chainId": 533,
    "baseDex": 1005,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "1006": {
    "chainId": 534,
    "baseDex": 1006,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "1007": {
    "chainId": 535,
    "baseDex": 1007,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "1009": {
    "chainId": 537,
    "baseDex": 1009,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "1010": {
    "chainId": 538,
    "baseDex": 1010,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "1012": {
    "chainId": 539,
    "baseDex": 1012,
    "stage": 1,
    "type": "2stage",
    "maxStage": 2,
    "next": [
      1013
    ],
    "prev": null
  },
  "1013": {
    "chainId": 539,
    "baseDex": 1012,
    "stage": 2,
    "type": "2stage",
    "maxStage": 2,
    "next": [],
    "prev": 1012
  },
  "1015": {
    "chainId": 1001,
    "baseDex": 1015,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "1016": {
    "chainId": 1002,
    "baseDex": 1016,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "1017": {
    "chainId": 1003,
    "baseDex": 1017,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  },
  "1024": {
    "chainId": 1004,
    "baseDex": 1024,
    "stage": 1,
    "type": "single",
    "maxStage": 1,
    "next": [],
    "prev": null
  }
};

G.getEvoChain = dex => G.EVO_CHAINS[dex] || (G.EVO_BY_DEX[dex] && G.EVO_CHAINS[G.EVO_BY_DEX[dex].baseDex]);
G.getEvoInfo = dex => G.EVO_BY_DEX[dex] || null;
G.getBaseDex = dex => (G.EVO_BY_DEX[dex] && G.EVO_BY_DEX[dex].baseDex) || dex;
G.getStage = dex => (G.EVO_BY_DEX[dex] && G.EVO_BY_DEX[dex].stage) || 1;
G.isBaseStage = dex => G.getStage(dex) === 1;
