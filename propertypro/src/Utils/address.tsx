export function getAddressComponents(addressString: string) {
  const components = addressString.split(", ");
  return { street: components[0], state: components[1] };
}
