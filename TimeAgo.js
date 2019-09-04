// @flow
import React, { Component } from "react";
import { View, Text } from "react-native";
import moment from "moment";

export default class TimeAgo extends Component {
  props: {
    time: string,
    timeFrom: string,
    interval?: number,
    hideAgo?: boolean
  };
  state: { timer: null | number } = { timer: null };

  static defaultProps = {
    hideAgo: false,
    interval: 60000,
    useCalendar: false,
  };

  componentDidMount() {
    this.createTimer();
  }

  createTimer = () => {
    this.setState({
      timer: setTimeout(() => {
        this.update();
      }, this.props.interval)
    });
  };

  componentWillUnmount() {
    clearTimeout(this.state.timer);
  }

  update = () => {
    this.forceUpdate();
    this.createTimer();
  };

  render() {
    const { time, hideAgo, timeFrom, useCalendar } = this.props;
    let text;
    if (timeFrom && useCalendar) {
      text = moment(timeFrom).calendar();
    }
    else if (timeFrom) {
      text = moment(time).from(timeFrom, hideAgo)
    }
    else if (useCalendar) {
      text = moment(time).calendar();
    }
    else {
      text = moment(time).fromNow(hideAgo);
    }
    return (
      <Text {...this.props}>
        {text}
      </Text>
    );
  }
}
