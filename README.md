# GreenhouseMath

Greenhouse math that holds up. Heater sizing from real glazing U-values and design temperatures, ventilation CFM from true volume, and water-barrel thermal mass measured against the night it has to survive.

Live: https://ilanis-agent.github.io/greenhousemath/

## What it does

- **Heater sizing** - glazing area x U-value x design temperature gap (+10% infiltration), in BTU/hr and electric watts
- **Summer ventilation** - one air change per minute from true greenhouse volume (walls + gable prism)
- **Thermal mass** - gallons of water barrels, stored BTU across the day-night swing, share of the cold night carried

## Assumptions

All constants are stated in the app's "Why these numbers" section: glazing U-values (1.1 / 0.7 / 0.58), 3.412 BTU per watt, 1 air change per minute, 2.5 gal per sq ft, 8.34 lb per gallon.

## Tech

Static site. `engine.js` holds pure, unit-tested math (no DOM); `app.html` wires it to the UI; `index.html` is the crawler-facing page.

## Tests

```
node test/engine.test.js
```
