import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';

type Props = TextProps & {
  children: React.ReactNode;
};

const Text = ({ children, style, ...rest }: Props) => {
  return (
    <RNText style={[styles.text, style]} {...rest}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins',
  },
});

export default Text;
