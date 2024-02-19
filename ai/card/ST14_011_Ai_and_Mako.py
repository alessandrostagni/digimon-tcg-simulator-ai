import time

from card.Card import Card

## TODO: Keep coding from here
class ST14_011_Ai_and_Mako(Card):

    async def on_play_effect(self, ws):
        await super().on_play_effect(ws)
        await self.bot.send_message(ws, 'ST14-11 Ai & Mako [On Play] effect: Reveal 4')
        await self.bot.reveal_card_from_top_from_deck(ws, 4)
        time.sleep(2)
        await self.bot.st14_011_ai_and_mako_on_play_strategy(ws)
    
    async def your_turn_effect(self, ws):
        await self.bot.send_message(ws, 'ST14-11 Ai & Mako [Your turn] effect:')
        await self.bot.st14_011_ai_and_mako_your_turn_strategy(ws)
