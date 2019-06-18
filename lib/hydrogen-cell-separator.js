'use babel';

import HydrogenCellSeparatorView from './hydrogen-cell-separator-view';
import { CompositeDisposable } from 'atom';

export default {

  hydrogenCellSeparatorView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.hydrogenCellSeparatorView = new HydrogenCellSeparatorView(state.hydrogenCellSeparatorViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.hydrogenCellSeparatorView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'hydrogen-cell-separator:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.hydrogenCellSeparatorView.destroy();
  },

  serialize() {
    return {
      hydrogenCellSeparatorViewState: this.hydrogenCellSeparatorView.serialize()
    };
  },

  toggle() {
    console.log('HydrogenCellSeparator was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
