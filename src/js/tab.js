const rootSelector = '[js-tabs]';

const selectors = {
    root: rootSelector,
    button: '[js-tabs-button]',
    content: '[js-tabs-content]',
};

const stateClasses = {
    tabActive: 'tab--active',
    contentActive: 'tabs__content--active'
};

const stateAttributes = {
    ariaSelected: 'aria-selected',
    tabIndex: 'tabindex',
};

function Tabs(rootElement) {
    const buttonElements = rootElement.querySelectorAll(selectors.button);
    const contentElements = rootElement.querySelectorAll(selectors.content);
    let state = {
        activeTabIndex: Array.prototype.findIndex.call(buttonElements, (item) => item.classList.contains(stateClasses.tabActive)),
    };

    if (state.activeTabIndex === -1) {
        state.activeTabIndex = 0;
    }

    function updateUI() {
        const { activeTabIndex } = state;

        buttonElements.forEach((item, index) => {
            const isActive = index === activeTabIndex;
            item.classList.toggle(stateClasses.tabActive, isActive);
            item.setAttribute(stateAttributes.ariaSelected, isActive);
            item.setAttribute(stateAttributes.tabIndex, isActive ? '0' : '-1');
        });

        contentElements.forEach((item, index) => {
            const isActive = index === activeTabIndex;
            item.classList.toggle(stateClasses.contentActive, isActive);
        });
    }

    function onButtonClick(index) {
        state.activeTabIndex = index;
        updateUI();
    }

    function bindEvents() {
        buttonElements.forEach((item, index) => {
            item.addEventListener('click', () => onButtonClick(index));
        });
    }

    bindEvents();
    updateUI();
}

function TabsCollection() {
    document.querySelectorAll(selectors.root).forEach((item) => Tabs(item));
}

export function initTabs() {
    TabsCollection();
}
