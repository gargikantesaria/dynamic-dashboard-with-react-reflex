export const buildCommands = [
    // {
    //     command: "position",
    //     requiredParams: ['stub', 'symbol']
    // },
    // {
    //     command: "positions",
    //     requiredParams: ['stub']
    // },
    {
        command: "long",
        requiredParams: ['stub', 'symbol'],
        atleastOneRequiredParams: ['base', 'quote', 'usd', 'size', 'scale']
    },
    // {
    //     command: "orders",
    //     requiredParams: ['stub', 'symbol']
    // },
    {
        command: "short",
        requiredParams: ['stub', 'symbol'],
        atleastOneRequiredParams: ['base', 'quote', 'usd', 'size', 'scale']
    },
    {
        command: "buy",
        requiredParams: ['stub', 'symbol'],
        atleastOneRequiredParams: ['base', 'quote', 'usd', 'size', 'scale']
    },
    {
        command: "sell",
        requiredParams: ['stub', 'symbol'],
        atleastOneRequiredParams: ['base', 'quote', 'usd', 'size', 'scale']
    },
    {
        command: "close",
        requiredParams: ['stub', 'symbol']
    },
    {
        command: "stoploss",
        requiredParams: ['stub', 'symbol', 'stoptrigger']
    },
    {
        command: "takeprofit",
        requiredParams: ['stub', 'symbol', 'profittrigger']
    },
    {
        command: "trailstop",
        requiredParams: ['stub', 'symbol', 'trailstop']
    },
    {
        command: "cancel",
        requiredParams: ['stub', 'symbol', 'id']
    },
    {
        command: "cancelall",
        requiredParams: ['stub', 'symbol']
    },
    {
        command: "leverage",
        requiredParams: ['stub', 'symbol', 'type']
    },
    // {
    //     command: "balances",
    //     requiredParams: ['stub']
    // },
    {
        command: "markets",
        requiredParams: ['stub']
    },
    {
        command: "market",
        requiredParams: ['stub', 'symbol']
    },
];