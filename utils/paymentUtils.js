function calculateAmount(booking) {
  const resourceType = booking.Resource?.type;

  if (!resourceType) {
    throw new Error("Resource type is missing for booking");
  }

  let amount;

  switch (resourceType.toLowerCase()) {
    case 'doctor':
      amount = 150.0;
      break;
    case 'restaurant table':
      amount = 80.0;
      break;
    case 'meeting room':
      amount = 120.0;
      break;
    default:
      throw new Error(`Unknown resource type: ${resourceType}`);
  }

  return amount;
}
module.exports = { calculateAmount };