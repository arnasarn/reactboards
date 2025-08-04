import * as React from "react";
import { Range } from "react-range";
import styles from "./RangeSelector.module.css";

type RangeSelectorProps = {
  values: number[];
  setValues: (values: number[]) => void;
  label: string;
};

const RangeSelector = ({ values, setValues, label }: RangeSelectorProps) => {
  return (
    <>
      <div className={styles.main}>
        <p className={styles.label}>
          {label}: {values[0]} - {values[1]}
        </p>
        <Range
          label="Select your value"
          step={1}
          min={1}
          max={12}
          values={values}
          onChange={(values) => setValues(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
                width: "100%",
                backgroundColor: "#ccc",
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              key={props.key}
              style={{
                ...props.style,
                height: "16px",
                width: "16px",
                backgroundColor: "#999",
              }}
            />
          )}
        />
      </div>
    </>
  );
};

export default RangeSelector;
