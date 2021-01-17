export const userData = [
  {
<<<<<<< HEAD
    _id: 0,
=======
    _id: "Z",
>>>>>>> 9fbe855405cebbc5b9e08785266b71696a8e2364
    firstName: "Simon",
    lastName: "Lau",
    organisation: "General Assembly Hungry",
    contactNum: "99998888",
    email: "simonlau@ga.com",
    username: "simonlau",
<<<<<<< HEAD
    type: 0,
    contributeList: [],
=======
    type: "contributor",
    contributeList: ["1"],
>>>>>>> 9fbe855405cebbc5b9e08785266b71696a8e2364
    myCart: [],
    receivedList: [],
    createdAt: 1029301932010,
    imgFile: "",
<<<<<<< HEAD
    status: 1,
  },
  {
    _id: 1,
=======
    status: "active",
  },
  {
    _id: "A",
>>>>>>> 9fbe855405cebbc5b9e08785266b71696a8e2364
    firstName: "Nausheen",
    lastName: ":)",
    organisation: "",
    contactNum: "88887777",
    email: "nausheen@ga.com",
    username: "nausheen",
<<<<<<< HEAD
    type: 1,
    contributeList: [],
    myCart: [],
    receivedList: ["123", "456"],
    createdAt: 1012313452,
    imgFile: "",
    status: 1,
  },
  {
    _id: 2,
=======
    type: "recipient",
    contributeList: [],
    myCart: [],
    receivedList: ["a", "b"],
    createdAt: 1012313452,
    imgFile: "",
    status: "active",
  },
  {
    _id: "B",
>>>>>>> 9fbe855405cebbc5b9e08785266b71696a8e2364
    firstName: "Mitch",
    lastName: "Goon",
    organisation: "",
    contactNum: "77776666",
    email: "mitchg@heavymetal.com",
    username: "mitchg",
<<<<<<< HEAD
    type: 0,
    contributeList: [],
    myCart: [],
    receivedList: ["0", "1"],
    createdAt: 1000333421,
    imgFile: "",
    status: 1,
  },
  {
    _id: 3,
=======
    type: "contributor",
    contributeList: ["0"],
    myCart: [],
    receivedList: [],
    createdAt: 1000333421,
    imgFile: "",
    status: "active",
  },
  {
    _id: "C",
>>>>>>> 9fbe855405cebbc5b9e08785266b71696a8e2364
    firstName: "Renice",
    lastName: "Goh",
    organisation: "Save the Hangries",
    contactNum: "66665555",
    email: "reniceg@coding.com",
    username: "reniceg",
<<<<<<< HEAD
    type: 0,
    contributeList: [],
    myCart: [],
    receivedList: ["987", "654", "321"],
    createdAt: 1004444444,
    imgFile: "",
    status: 1,
  }
];

export const batchData = [
    {
        _id: 0,
        createdAt: 112039485.
        listingsCollection: [0, 1],
        contactPerson: "Gloria",
        contactNum: 98765432,
        collectionAdress: 513456,
        status: 1
    },
    {
        _id: 1,
        createdAt: 112039486,
        listingsCollection: [2, 3],
        contactPerson: "Bairong",
        contactNum: 91234567,
        collectionAdress: 123456,
        status: 1
    },
]

export const listingData = [
    {
        _id: 0,
        title: "apple",
        quantity: "5",
        category: "fruit",
        isHalal: true,
        isVegetarian: true,
        description: "bright red pretty shinny fat round",
        bestBefore: "04/5/1960",
        image: "",
        status: 2,
        recipient: 2,
        Contributor: 1
    },
    {
        _id: 1,
        title: "pear",
        quantity: "5",
        category: "fruit",
        isHalal: true,
        isVegetarian: true,
        description: "bright green pretty shinny skinny shapy",
        bestBefore: "03/05/1955",
        image: "",
        status: 1,
        recipient: null,
        Contributor: 0
    },
    {
        _id: 2,
        title: "durian",
        quantity: "5",
        category: "fruit",
        isHalal: true,
        isVegetarian: true,
        description: "dull spikey painful hard smelly",
        bestBefore: "01/5/1990",
        image: "",
        status: 3,
        recipient: null,
        Contributor: 3
    }
]
=======
    type: "contributor",
    contributeList: [],
    myCart: [],
    receivedList: [],
    createdAt: 1004444444,
    imgFile: "",
    status: "active",
  },
];

export const batchData = [
  {
    _id: "0",
    createdAt: 112039485,
    listingsCollection: ["a", "b"],
    contactPerson: "Gloria",
    contactNum: 98765432,
    collectionAdress: 513456,
    status: "active",
    Contributor: "2",
  },
  {
    _id: "1",
    createdAt: 112039486,
    listingsCollection: ["c"],
    contactPerson: "Bairong",
    contactNum: 91234567,
    collectionAdress: 123456,
    status: "active",
    Contributor: "0",
  },
  {
    _id: "2",
    createdAt: 112039485,
    listingsCollection: ["d"],
    contactPerson: "Gloria",
    contactNum: 98765432,
    collectionAdress: 513456,
    status: "active",
    Contributor: "B",
  },
];

export const listingData = [
  {
    _id: "a",
    title: "apple",
    quantity: "5",
    category: "fruit",
    isHalal: true,
    isVegetarian: true,
    description: "bright red pretty shinny fat round",
    bestBefore: "04/5/1960",
    image: "",
    status: "Active",
    recipient: "2",
    createdAt: 32523532523,
    batchID: "0",
  },
  {
    _id: "b",
    title: "pear",
    quantity: "5",
    category: "fruit",
    isHalal: true,
    isVegetarian: true,
    description: "bright green pretty shinny skinny shapy",
    bestBefore: "03/05/1955",
    image: "",
    status: "Active",
    recipient: "2",
    createdAt: 32523532523,
    batchID: "0",
  },
  {
    _id: "c",
    title: "durian",
    quantity: "5",
    category: "fruit",
    isHalal: true,
    isVegetarian: true,
    description: "dull spikey painful hard smelly",
    bestBefore: "01/5/1990",
    image: "",
    status: "Active",
    recipient: "",
    createdAt: 32523532523,
    batchID: "0",
  },
  {
    _id: "d",
    title: "mango",
    quantity: "1",
    category: "fruit",
    isHalal: true,
    isVegetarian: true,
    description: "dull spikey painful hard smelly",
    bestBefore: "01/5/1990",
    image: "",
    status: "Active",
    recipient: "",
    createdAt: 32523532523,
    batchID: "2",
  },
];
>>>>>>> 9fbe855405cebbc5b9e08785266b71696a8e2364
