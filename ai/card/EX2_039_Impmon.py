import time

from card.Card import Card


class EX2_039_Impmon(Card):

    def __init__(self, bot, **kwargs):
        self.bot = bot
        self.extra_args = kwargs

    async def put_cards_to_bottom_of_deck(self, ws):
        time.sleep(2)
        for i in range(len(self.bot.game['player2Reveal'])):
            await self.bot.put_card_to_bottom_of_deck(ws, 'Reveal', 0)

    ## TODO: Make optional to trash up to three cards
    async def when_trashed_effect(self, ws):
        trashed_cards = []
        for i in range(3):
            if len(self.bot.game['player2DeckField']) > 0:
                time.sleep(0.3)
                trashed_cards.append(await self.bot.trash_top_card_of_deck(ws))
        for i in range(len(trashed_cards)):
            card_obj = self.bot.card_factory.get_card(trashed_cards[i]['uniqueCardNumber'], trash_index=i)
            await card_obj.when_trashed_effect(ws)

    async def on_play_effect(self, ws):
        await self.bot.reveal_top_from_deck(ws, 4)
        time.sleep(3)
        beelzemon_candidates = []
        ai_and_mako_candidates = []
        for i in range(len(self.bot.game['player2Reveal'])):
            card = self.bot.game['player2Reveal'][i]
            if 'Beelzemon' in card['name']:
                beelzemon_candidates.append(i)
            elif 'Ai & Mako' in card['name']:
                ai_and_mako_candidates.append(i)
        ## Better strategy on which Beelzemon and which Ai & Mako to get can be implemented here
        if len(beelzemon_candidates) > 0:
            card_index = beelzemon_candidates[0]
            await self.bot.move_card(ws, f'myReveal{card_index}', f'myHand')
            self.bot.game['player2Hand'].append(self.bot.game['player2Reveal'].pop(card_index))
        if len(ai_and_mako_candidates) > 0:
            card_index = ai_and_mako_candidates[0]
            await self.bot.move_card(ws, f'myReveal{card_index}', f'myHand')
            self.bot.game['player2Hand'].append(self.bot.game['player2Reveal'].pop(card_index))
        time.sleep(2)
        await self.put_cards_to_bottom_of_deck(ws)   
