import { scaleTransform } from '@uwdata/mosaic-sql';

export function channelScale(mark, channel) {
  const { plot } = mark;

  let scaleType = plot.getAttribute(`${channel}Scale`);
  if (!scaleType) {
    const { field } = mark.channelField(channel, `${channel}1`, `${channel}2`);
    const { type } = mark.stats[field.column];
    scaleType = type === 'date' ? 'time' : 'linear';
  }

  const options = { type: scaleType };
  switch (scaleType) {
    case 'log':
      options.base = plot.getAttribute(`${channel}Base`) ?? 10;
      break;
    case 'pow':
      options.exponent = plot.getAttribute(`${channel}Exponent`) ?? 1;
      break;
    case 'symlog':
      options.constant = plot.getAttribute(`${channel}Constant`) ?? 1;
      break;
  }

  return scaleTransform(options);
}
