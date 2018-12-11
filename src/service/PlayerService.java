package service;

import java.util.List;
import java.util.stream.Collectors;

import dto.PlayerDto;
import game.Player;
import server.Server;

public class PlayerService {
	
	private final Server server;
	
	public PlayerService(Server server) {
		this.server = server;
	}
	
	public List<PlayerDto> getPlayersDto() {
		return server.getPlayers().stream().map(this::mapToPlayerDto).collect(Collectors.toList());
	}
	
	private  PlayerDto mapToPlayerDto(Player player) {
		PlayerDto dto = new PlayerDto();
		dto.setName(player.getName());
		dto.setCountLosts(player.getCountLosts());
		dto.setCountWins(player.getCountWins());
		dto.setPoints(player.getPoints());
		return dto;
	}

}
