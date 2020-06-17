import {
  fromPathStringToIndex,
  fromIndexToPathString,
} from "./retroCertsWeeks";

describe("retroCertsWeeks tests", () => {
  it("fromPathStringToIndex", () => {
    expect(fromPathStringToIndex("")).toBe(-1);
    expect(fromPathStringToIndex("20-02-15")).toBe(-1);
    expect(fromPathStringToIndex("02/15/20")).toBe(-1);
    expect(fromPathStringToIndex("02/15/2020")).toBe(-1);
    expect(fromPathStringToIndex("2020-02-15")).toBe(1);
    expect(fromPathStringToIndex("2020-02-09")).toBe(-1);
    expect(fromPathStringToIndex("2020-05-09")).toBe(13);
    expect(fromPathStringToIndex("2020-03-21")).toBe(6);
    expect(fromPathStringToIndex("2020-02-08")).toBe(0);
  });

  it("fromIndexToPathString", () => {
    expect(fromIndexToPathString(-1)).toEqual("");
    expect(fromIndexToPathString()).toEqual("");
    expect(fromIndexToPathString("foo")).toEqual("");
    expect(fromIndexToPathString(0)).toEqual("2020-02-08");
    expect(fromIndexToPathString(3)).toEqual("2020-02-29");
    expect(fromIndexToPathString(7)).toEqual("2020-03-28");
    expect(fromIndexToPathString(13)).toEqual("2020-05-09");
    expect(fromIndexToPathString(14)).toEqual("");
  });
});
