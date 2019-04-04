'use strict'

function manageMenus(){

    const navMobileTray = toggableComponent({
        selector:'#nav__mobile__navtray',
        controlSelector: '#nav__mobile__navtray__close',
        closeAnimation:'slideOutLeft',
        openAnimation:'slideInLeft',
        startsHidden: true,
        triggers: '#nav__hamburger__button'
    });

    const hamburgerMenu = toggableComponent({
        selector:'#nav__hamburger__button',
        controlSelector: '#nav__hamburger__button',
        closeAnimation: 'fadeOut',
        openAnimation: 'fadeIn',
        triggers: '#nav__mobile__navtray'
    });

}

function toggableComponent(componentProps){
    let state = {
        visible: true,
        isHidden: false
    }
    
    let props = Object.assign({},componentProps);

    if(props.startsHidden){
        state = Object.assign({},state, {visible:false, isHidden:true});
    }

    const component = document.querySelector(props.selector);
    const componentController = document.querySelector(props.controlSelector);

    componentController.addEventListener('touchend',()=>{
        toggleComponent();
        if(props.triggers){
            triggerComponent(props.triggers);
        }
    });

    const toggleComponent = () => {
        state.visible ? updateState({visible:false}, true) : updateState({visible:true}, true);
    }

    component.toggleComponent = toggleComponent;

    const updateState = (property, triggerUpdate) => {
        state = Object.assign({}, state, property);
        triggerUpdate ? updateComponent() : null;
    }

    const triggerComponent = target => {
        let component = document.querySelector(target);
        component.toggleComponent();
    }

    const updateComponent = () => {
        if(state.visible) {
            if(state.isHidden){
                toggleClasses(['hidden']);
                toggleClasses([props.openAnimation]);
                updateState({isHidden:false}, false);
            } else{
                toggleClasses([props.closeAnimation, props.openAnimation]);
            }
        } else {
            toggleClasses([props.openAnimation, props.closeAnimation]);
        }
    }

    const toggleClasses = classes => {
        for(let className in classes){
            component.classList.toggle(classes[className]);
        }
    }

    return toggleComponent;
}