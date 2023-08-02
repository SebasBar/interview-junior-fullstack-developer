export function searchTypeToText(type: string): string {
  switch (type) {
    case 'byName':
      return 'by "Name"';
    case 'byUuid':
      return 'by "Uuid"';
    case 'byCount':
      return 'by "Count"';
    default:
      return '';
  }
}
