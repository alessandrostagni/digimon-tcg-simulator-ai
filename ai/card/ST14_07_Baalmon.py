import time

from card.Card import Card


class ST14_07_Baalmon(Card):

    def __init__(self, bot, **kwargs):
        self.bot = bot
        self.extra_args = kwargs
    
    async def on_deletion_effect(self, ws, digimon_index):
        if len(self.bot.game['player2Trash']) >= 10:
            await self.st14_07_baalmon_baalmon_deleted_strategy(ws, digimon_index)

    ## TODO: Can target strategy to 
    async def when_digivolving_effect(self, ws):
        trashed_cards = []
        for i in range(3):
            if len(self.bot.game['player2DeckField']) > 0:
                time.sleep(0.3)
                trashed_cards.append(await self.bot.trash_top_card_of_deck(ws))
        for i in range(len(trashed_cards)):
            card_obj = self.bot.card_factory.get_card(trashed_cards[i]['uniqueCardNumber'], trash_index=i)
            await card_obj.when_trashed_effect(ws)
        self.bot.effects['endOfOpponentTurnEffects']['player2Digi'][self.extra_args['digimon_index']].append(lambda: self.on_deletion_effect(ws, self.extra_args['digimon_index']))
