import getEdgeIndices from '../../util/getEdgeIndices';

describe('getEdgeIndices', () => {
  describe('when all y values are non-zero', () => {
    it('returns [0, data.length - 1]', () => {
      const data = [{ y: 1 }, { y: 2 }, { y: 3 }];
      expect(getEdgeIndices(data)).toEqual([0, data.length - 1]);
    });
  });

  describe('when y values start with zeroes', () => {
    it('skips the leading zeroes and returns the correct indices', () => {
      const data = [{ y: 0 }, { y: 0 }, { y: 1 }, { y: 2 }, { y: 3 }];
      expect(getEdgeIndices(data)).toEqual([2, data.length - 1]);
    });
  });

  describe('when y values end with zeroes', () => {
    it('skips the trailing zeroes and returns the correct indices', () => {
      const data = [{ y: 1 }, { y: 2 }, { y: 3 }, { y: 0 }, { y: 0 }];
      expect(getEdgeIndices(data)).toEqual([0, data.length - 3]);
    });
  });

  describe('when y values start and end with zeroes', () => {
    it('skips both the leading and trailing zeroes and returns the correct indices', () => {
      const data = [{ y: 0 }, { y: 0 }, { y: 1 }, { y: 2 }, { y: 3 }, { y: 0 }, { y: 0 }];
      expect(getEdgeIndices(data)).toEqual([2, data.length - 4]);
    });
  });
});
