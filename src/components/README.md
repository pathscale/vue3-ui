# Components library
  - [Button](#button)
  - [Card](#card)
  - [CardBody](#cardbody)
  - [CardTitle](#cardtitle)
  - [Input](#input)
  - [Typography](#typography)

## Button
Props
| Name  | Type   | Required | Default | Values            | Description      |
|-------|--------|----------|---------|-------------------|------------------|
| color | string | false    | wine    | light, dark, wine | background color |
| slot  | node   |          |         |                   | button content   |

## Card
Props
| Name  | Type   | Required | Default | Values      | Description      |
|-------|--------|----------|---------|-------------|------------------|
| color | string | false    | light   | light, dark | background color |
| slot  | node   |          |         |             | card content     |

## CardBody
Props
| Name | Type | Required | Default | Values | Description       |
|------|------|----------|---------|--------|-------------------|
| slot | node |          |         |        | card body content |

## CardTitle
| Name | Type | Required | Default | Values | Description       |
|------|------|----------|---------|--------|-------------------|
| slot | node |          |         |        | card header content |

## Input
| Name  | Type   | Required | Default | Values | Description                         |
|-------|--------|----------|---------|--------|-------------------------------------|
| label | string | false    |         |        | label for the input                 |
| name  | string | true     |         |        | field name, binding label and input |

## Typography
| Name    | Type   | Required | Default | Values                    | Description                  |
|---------|--------|----------|---------|---------------------------|------------------------------|
| variant | string | false    | p       | h1, h2, h3, h4, h5, h6, p | html tag to use for the text |
| color   | string | false    | dark    | light, dark               | text color                   |
| slot    | node   |          |         |                           | text                         |