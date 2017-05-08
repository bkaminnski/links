import MenuAndContent from '../page/MenuAndContent.jsx';

export default class ApplicationLayoutEvents {

    publishAvailable() {
        PubSub.publish('uiEvent.applicationLayout.isAvailable', <MenuAndContent />)
    }
}