// we don't need to save translations in enums for RadioButton
// for todo status - yes we need it, but not for translations.
// We can solve it by renaming our enum to enum Status {...}
export enum RadioButton {
  pending = 'pending',
  ongoing = 'ongoing',
  completed = 'completed',
}
