class Player {
	constructor(name, teamColor) {
		this.name = name;
		this.teamColor = teamColor;
		this.state = 'alive';
	}
	win () {
		console.log(this.name, 'win');
	}

	lose () {
		console.log(this.name, 'lose');
	}

	die () {
		this.state = 'dead';
		playerDirector.receiveMessage('playerDead', this);
	}
	remove () {
		playerDirector.reciveMessage('removePlayer', this);
	}

	changeTeam (color) {
		playerDirector.receiveMessage('changeTeam', this, color);
	}
}

// 工厂创建玩家
const playerFactor = (name, teamColor) => {
	const newPlayer = new Player(name, teamColor);
	playerDirector.receiveMessage('addPlayer', newPlayer);
	return newPlayer;
}

// 中介者
const playerDirector = (() => {
  // TODO 添加按照颜色数组，存放生存状态
	const players = {},
    operations = {};

    // 新增
		operations.addPlayer = (player) => {
			const teamColor = player.teamColor;

			players[teamColor] = players[teamColor] || [];

			players[teamColor].push(player);
    };

    // 移除
    operations.removePlayer = (player) => {
      const teamColor = player.teamColor,
        teamPlayers = players[teamColor] || [];

        teamPlayers = teamPlayers.filter(item => item == player);
    }

    // 换队
    operations.changeTeam = (player, newTeamColor) => {
      operations.removePlayer(player);
      player.teamColor = newTeamColor;
      operations.addPlayer(player);
    }
    // 玩家死亡
    operations.playerDead = (player) => {
      const teamColor = player.teamColor,
        teamPlayers = players[ teamColor ];
      
      let allDead = !teamPlayers.some(item => item.state !== 'dead');

      if(allDead ) {
        teamPlayers.forEach(item => {
          item.lose();
        })
        
        for(color in players) {
          if(color !== player.teamColor) {
            const winTeam = players[color];

            winTeam.forEach(item => {
              item.win();
            })
          }
        }
      }
    }

    // 报露接口
    const receiveMessage = function () {
      const message = Array.prototype.shift.call(arguments);
      operations[message].apply(this, arguments);
    }
    
    return {
      receiveMessage: receiveMessage
    }
})();

const player1 = playerFactor('红1', 'red');
const player2 = playerFactor('蓝1', 'blue');
const player3 = playerFactor('蓝2', 'blue');
const player4 = playerFactor('green', 'green');
player1.die();
player4.die();
