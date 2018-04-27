const SUB_MENU = 'subItems';
const SIDE_BAR_DATA = [
    { name: 'Home', link: '/', iconName: 'fas fa-home'},
    { name: 'Bubble', link: '/bubble', iconName: 'fas fa-comment-dots'},
    { name: 'Accordion', link: '/accordion', iconName: 'fas fa-comment-dots'},
    {
        name: 'Test',
        [SUB_MENU]: [
            {name: 'subTest1', link: '/subTest1'},
            {name: 'subTest2', link: '/subTest2'}
        ]
    },
    {
        name: 'Test12',
        [SUB_MENU]: [
            {name: 'subTest3', link: '/subTest3'},
            {name: 'subTest8', link: '/subTest4'}
        ]
    }
];

export {
    SUB_MENU,
    SIDE_BAR_DATA
};
