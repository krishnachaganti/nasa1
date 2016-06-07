import React from 'react';
import classes from './HomeView.scss';
import Card from '../../components/Card';
import CardImage from '../../components/Card/CardImage';
import CardContent from '../../components/Card/CardContent';
import SubToolbar from '../../components/SubToolbar';

export const HomeView = () => (
  <div className="gridsys">
    <SubToolbar orgCode="IT-A" />
    <div className="row">
      <Card className="third" cardImage={ <CardImage /> } cardContent={
        <CardContent personName="Wendy Hamburger" jobTitle="Managing Dictator" orgCode="IT-A" /> }
      />
    </div>
    <div className="row">
      <Card className="third" cardImage={ <CardImage /> } cardContent={
        <CardContent personName="Wendy Hamburger" jobTitle="Managing Dictator" orgCode="IT-A" /> }
      />
      <Card className="third" cardImage={ <CardImage /> } cardContent={
        <CardContent personName="Wendy Hamburger" jobTitle="Managing Dictator" orgCode="IT-A" /> }
      />
      <Card className="third" cardImage={ <CardImage /> } cardContent={
        <CardContent personName="Wendy Hamburger" jobTitle="Managing Dictator" orgCode="IT-A" /> }
      />
    </div>
    <SubToolbar orgCode="IT-B" />
    <div className="row">
      <Card className="third" cardImage={ <CardImage /> } cardContent={
        <CardContent personName="Wendy Hamburger" jobTitle="Managing Dictator" orgCode="IT-A" /> }
      />
      </div>
    <SubToolbar orgCode="IT-C" />
    <div className="row">
      <Card className="third" cardImage={ <CardImage /> } cardContent={
        <CardContent personName="Wendy Hamburger" jobTitle="Managing Dictator" orgCode="IT-A" /> }
      />
      </div>
  </div>
);

export default HomeView;
